---
name: dashboard-data-pipeline
description: 일룸 대시보드 데이터 파이프라인. raw-data 원본 파일을 PRD 정제 규칙대로 가공하여 Google Sheets에 입력. "데이터 파이프라인", "데이터 가공", "시트 업데이트", "raw-data 처리", "대시보드 데이터" 등을 언급하면 자동 실행.
allowed-tools:
  - Bash
  - Read
  - Write
---

# 일룸 매출 통합 대시보드 - 데이터 파이프라인

`50-resources/raw-data/` 원본 데이터를 PRD 정제 규칙에 따라 가공하고, 통합 스키마에 맞춰 Google Sheets에 입력하는 반복 실행 가능한 파이프라인.

## 스크립트 위치

```
.claude/skills/dashboard-data-pipeline/scripts/pipeline.py
```

## Prerequisites

```bash
pip install openpyxl>=3.1.0
```

Google Sheets 인증: `python3 ~/.claude/lib/google_auth.py --auth`

## 사용법

### 1. Dry Run (검증만, 시트 입력 없음)

```bash
python3 .claude/skills/dashboard-data-pipeline/scripts/pipeline.py \
  --raw-dir 50-resources/raw-data \
  --dry-run
```

### 2. 새 스프레드시트 생성 + 데이터 입력

```bash
python3 .claude/skills/dashboard-data-pipeline/scripts/pipeline.py \
  --raw-dir 50-resources/raw-data \
  --create "일룸 매출 통합 대시보드"
```

### 3. 기존 스프레드시트에 데이터 갱신

```bash
python3 .claude/skills/dashboard-data-pipeline/scripts/pipeline.py \
  --raw-dir 50-resources/raw-data \
  --spreadsheet-id <SPREADSHEET_ID>
```

### 4. 대시보드 JSON도 함께 출력

```bash
python3 .claude/skills/dashboard-data-pipeline/scripts/pipeline.py \
  --raw-dir 50-resources/raw-data \
  --spreadsheet-id <SPREADSHEET_ID> \
  --json-dir 10-projects/13-dashboard/dashboard/public/data
```

## 파이프라인 단계

| Step | 내용 |
|------|------|
| 1 | 기준 데이터 로드 (상품기준시트, 매장마스터, 목표실적) |
| 2 | 채널별 원본 정제 (ERP/네이버/오늘의집/공식몰) |
| 3 | 코드 매핑 + 채널 통합 (단일 테이블) |
| 4 | 채산 계산 (수수료 반영 → 정산금액, 마진, 마진율) |
| 5 | 시트별 요약 생성 (채널별요약, 목표달성) |
| 6 | Google Sheets 입력 or JSON 출력 |

## 출력 시트 구조

### 통합매출 시트
PRD 통합 테이블 스키마 그대로:
`date, month, channel, product_code, product_name, series, category, qty, sale_amount, supply_price, commission, settled_amount, margin, margin_rate, store_code, store_name, region`

### 채널별요약 시트
`month, channel, sale_amount, settled_amount, margin, margin_rate, count`

### 목표달성 시트
`month, store_code, store_name, region, store_type, actual, target, achievement_rate`

## 정제 규칙 요약

| 채널 | 규칙 |
|------|------|
| ERP | Row 1-4 제거, Row 5 헤더, 합계행 제거, 배송상태 "취소" 제외 |
| 네이버 | 30→8컬럼, datetime→date, 주문상태 "취소" 제외, NV코드→일룸코드 매핑 |
| 오늘의집 | 금액 텍스트→숫자, 날짜 점→하이픈, 수수료율 %→소수, OH코드→일룸코드 매핑 |
| 공식몰 | MM/DD/YYYY→YYYY-MM-DD, status "cancelled" 제외 |

## 반복 실행

새 월 데이터가 `raw-data/`에 추가되면 동일 커맨드 재실행. 시트 데이터는 전체 클리어 후 재입력되므로 중복 없음.

## Workflow

1. 사용자가 파이프라인 실행을 요청하면, 먼저 `--dry-run`으로 데이터 검증
2. 검증 결과를 사용자에게 보고 (건수, 기간, 총매출 등)
3. 확인 받은 후 실제 시트 입력 실행
4. 필요시 `--json-dir`로 대시보드 JSON도 동시 생성
