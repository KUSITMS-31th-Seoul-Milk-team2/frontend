import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchComponent: React.FC = () => {
  const [filters, setFilters] = useState({
    writer: "",
    supplier: "",
    recipient: "",
    approvalNumber: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SearchContainer>
      <GlobalStyles />
      <SearchBox>
        <InputContainer>
          <Label>작성자</Label>
          <Input
            type="text"
            name="writer"
            placeholder="입력"
            value={filters.writer}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>공급자 사업체명</Label>
          <Input
            type="text"
            name="supplier"
            placeholder="입력"
            value={filters.supplier}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>공급받는자 사업체명</Label>
          <Input
            type="text"
            name="recipient"
            placeholder="입력"
            value={filters.recipient}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Label>승인번호</Label>
          <Input
            type="text"
            name="approvalNumber"
            placeholder="입력"
            value={filters.approvalNumber}
            onChange={handleChange}
          />
        </InputContainer>

        <DateContainer>
          <DateLabel>기간</DateLabel>
          <DatePickerWrapper>
            <StyledDatePicker
              selected={filters.startDate}
              onChange={(date: Date) => setFilters({ ...filters, startDate: date })}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              calendarClassName="custom-calendar"
            />
            <Icon src="/calendar.svg" alt="Calendar Icon" />
          </DatePickerWrapper>
          <DateCheck> ~ </DateCheck>
          <DatePickerWrapper>
            <StyledDatePicker
              selected={filters.endDate}
              onChange={(date: Date) => setFilters({ ...filters, endDate: date })}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              calendarClassName="custom-calendar"
            />
            <Icon src="/calendar.svg" alt="Calendar Icon" />
          </DatePickerWrapper>
        </DateContainer>

        <ButtonContainer>
          <DateFilterButton>전체</DateFilterButton>
          <DateFilterButton>오늘</DateFilterButton>
          <DateFilterButton>1주 이내</DateFilterButton>
          <DateFilterButton>이번 달</DateFilterButton>
          <DateFilterButton>이번 분기</DateFilterButton>
          <DateFilterButton>올해</DateFilterButton>
        </ButtonContainer>
      </SearchBox>

      <ResultContainer>
        <SearchResult>
          검색결과 <ResultCount>48</ResultCount>건
        </SearchResult>
        <SelectedFilters>
          <FilterTag>작성 ⨉</FilterTag>
          <FilterTag>작성 ⨉</FilterTag>
        </SelectedFilters>
        <SearchButton>검색</SearchButton>
      </ResultContainer>
    </SearchContainer>
  );
};

export default SearchComponent;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-right: 30px;
  width: 158px;
`;

const DateLabel = styled(Label)`
  margin-right: -10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10.5px;
  border-radius: 4px;
  border: 1px solid #777;
  background: #FFF;
  font-size: 14px;

  &::placeholder {
    color: #777;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const DateCheck = styled.span`
  margin-left : 10px;
  margin-right : 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 8px;
  padding-right: 36px;
  border: 1px solid #777;
  border-radius: 4px;
  background: #FFF;
  font-size: 14px;
  cursor: pointer;
  width: 150px;
`;

const Icon = styled.img`
  position: absolute;
  right: 8px;
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const DateFilterButton = styled.button`
  padding: 8px 12px;
  background: #009857;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
  border: 1px solid #009857;
`;

const SearchResult = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #393C3C;
  margin-right : 13px;
`;
const ResultCount = styled.strong`
    color: #009857;
    margin-left: 4px;
`;

const SelectedFilters = styled.div`
  display: flex;
  gap: 8px;
  flex-grow: 1;
  background: #F7F7F7;
  padding: 8px;
  border-radius: 8px;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid #6A6A6A;
  background: #FFF;
  font-size: 16px;
  color: #6A6A6A;
`;

const SearchButton = styled.button`
  padding: 12px 32px;
  background: #009857;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const GlobalStyles = createGlobalStyle`
  .custom-calendar {
    font-family: Pretendard, sans-serif;
    background-color: white !important;
  }

  .react-datepicker {
    background-color: white !important;
    border: 1px solid #ddd;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .react-datepicker__header {
    background-color: white !important;
    border-bottom: 1px solid #ddd;
  }

  .react-datepicker__current-month {
    color: #009857 !important;
    font-weight: bold;
  }

  .react-datepicker__navigation {
    color: #009857 !important;
  }

  .react-datepicker__day--selected {
    background-color: #009857 !important;
    color: white !important;
    border-radius: 50%;
    font-weight: bold !important;
  }

  .react-datepicker__day--today {
    color: #009857 !important;
    font-weight: bold;
  }

  .react-datepicker__day--today.react-datepicker__day--selected {
    color: white !important;
  }
`;


