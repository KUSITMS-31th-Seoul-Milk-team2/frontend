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
          <Label>기간</Label>
          <StyledDatePicker
            selected={filters.startDate}
            onChange={(date: Date) => setFilters({ ...filters, startDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            calendarClassName="custom-calendar"
          />
          <span> ~ </span>
          <StyledDatePicker
            selected={filters.endDate}
            onChange={(date: Date) => setFilters({ ...filters, endDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            calendarClassName="custom-calendar"
          />
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
        <SelectedFilters>
          <FilterTag>작성 ⨉</FilterTag>
          <FilterTag>작성 ⨉</FilterTag>
        </SelectedFilters>
        <SearchResult>검색결과 <strong>48건</strong></SearchResult>
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
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--gray-800, #777);
  background: var(--white, #FFF);
  font-size: 14px;

  &::placeholder {
    color: var(--gray-800, #777);
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 8px;
  border: 1px solid var(--gray-800, #777);
  border-radius: 4px;
  background: var(--white, #FFF);
  font-size: 14px;
  cursor: pointer;
  width: 150px;
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
  background: #eef7f1;
  padding: 12px;
  border-radius: 8px;
  margin-top: 12px;
`;

const SelectedFilters = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterTag = styled.div`
  background: #009857;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

const SearchResult = styled.div`
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background: #009857;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const GlobalStyles = createGlobalStyle`
  .custom-calendar {
    font-family: Pretendard, sans-serif;
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

  .react-datepicker__navigation {
    color: #009857 !important;
  }

  .react-datepicker__current-month {
    color: var(--gray-1300, #545454); !important;
    font-weight: bold;
  }
`;
