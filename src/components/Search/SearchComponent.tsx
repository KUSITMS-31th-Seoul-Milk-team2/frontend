import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfMonth, startOfQuarter, startOfYear, subWeeks } from "date-fns";
import calendar from "@assets/icons/calendar.svg";
import resetIcon from "@assets/icons/reset.svg";

const SearchComponent: React.FC = () => {
  const [filters, setFilters] = useState({
    writer: "",
    supplier: "",
    recipient: "",
    approvalNumber: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [selectedFilter, setSelectedFilter] = useState<string | null>("전체");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
    const value = filters[field as keyof typeof filters];
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && typeof value === "string" && value.trim() !== "") {
      if (!filterTags.includes(value.trim())) {
        setFilterTags((prevTags) => [...prevTags, value.trim()]);
      }
      setFilters({ ...filters, [field]: "" });
    }
  };

const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);

    const today = new Date();
    let newStartDate: Date | null = null;
    let newEndDate: Date | null = today;

    switch (filter) {
      case "오늘":
        newStartDate = today;
        break;
      case "1주 이내":
        newStartDate = subWeeks(today, 1);
        break;
      case "이번 달":
        newStartDate = startOfMonth(today);
        break;
      case "이번 분기":
        newStartDate = startOfQuarter(today);
        break;
      case "올해":
        newStartDate = startOfYear(today);
        break;
      case "전체":
        newStartDate = null;
        newEndDate = null;
        break;
    }

    setFilters((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };
  const handleRemoveFilterTag = (index: number) => {
    setFilterTags(filterTags.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFilters({
      writer: "",
      supplier: "",
      recipient: "",
      approvalNumber: "",
      startDate: null,
      endDate: null,
    });
    setFilterTags([]); 
    setSelectedFilter("전체");
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
            placeholder="작성자명 입력하세요."
            value={filters.writer}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "writer")}
          />
        </InputContainer>
        <InputContainer>
          <Label>공급자 사업체명</Label>
          <Input
            type="text"
            name="supplier"
            placeholder="지점명을 입력하세요."
            value={filters.supplier}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "supplier")}
          />
        </InputContainer>
        <InputContainer>
          <Label>공급받는자 사업체명</Label>
          <Input
            type="text"
            name="recipient"
            placeholder="대리점명 입력하세요."
            value={filters.recipient}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "recipient")}
          />
        </InputContainer>
        <InputContainer>
          <Label>승인번호</Label>
          <Input
            type="text"
            name="approvalNumber"
            placeholder="12345678"
            value={filters.approvalNumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "approvalNumber")}
          />
          <Input
            type="text"
            name="approvalNumber"
            placeholder="12345678"
            value={filters.approvalNumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "approvalNumber")}
          />
          <Input
            type="text"
            name="approvalNumber"
            placeholder="12345678"
            value={filters.approvalNumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, "approvalNumber")}
          />
        </InputContainer>

        <DateContainer>
          <DateLabel>기간</DateLabel>
          <DatePickerWrapper>
          <Icon src={calendar} alt="Calendar Icon" />
            <StyledDatePicker
              selected={filters.startDate}
              onChange={(date: Date) => setFilters({ ...filters, startDate: date })}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              calendarClassName="custom-calendar"
            />
          </DatePickerWrapper>
          <DateCheck> ~ </DateCheck>
          <DatePickerWrapper>
          <Icon src={calendar} alt="Calendar Icon" />
            <StyledDatePicker
              selected={filters.endDate}
              onChange={(date: Date) => setFilters({ ...filters, endDate: date })}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              calendarClassName="custom-calendar"
            />
          </DatePickerWrapper>
        </DateContainer>

        <ButtonContainer>
      {["전체", "오늘", "1주 이내", "이번 달", "이번 분기", "올해"].map((filter) => (
        <DateFilterButton
        key={filter}
        onClick={() => handleFilterClick(filter)}
        isSelected={selectedFilter === filter}
      >
        {filter}
      </DateFilterButton>
      ))}
    </ButtonContainer>
      </SearchBox>

      <ResultContainer>
        <SearchResult>
          검색결과 <ResultCount>48</ResultCount>건
        </SearchResult>
        <SelectedFilters>
          {filterTags.map((tag, index) => (
            <FilterTag key={index} onClick={() => handleRemoveFilterTag(index)}>
              {tag} ⨉
            </FilterTag>
          ))}
            
        </SelectedFilters>
        <ResetButton onClick={handleReset}>
              <ResetIcon src={resetIcon} alt="초기화 아이콘" />
                초기화
          </ResetButton>
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
  @media (max-width: 1104px) {
    padding: 12px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 12px;
  gap : 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-right: 30px;
  width: 158px;
`;

const DateLabel = styled(Label)`
  margin-right: 30px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10.5px;
  border-radius: 4px;
  border: 1px solid #777;
  background: #FFF;
  font-size: 14px;
  min-width: 150px;
  &::placeholder {
    color: #777;
  }

  @media (max-width: 768px) {
    width: 30%; 
    font-size: 12px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    width: 20%;
    font-size: 12px;
    padding: 6px;
  }
`;


const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-top : 12px;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 140px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px 10px 10px 30px;
  border: 1px solid #777;
  border-radius: 4px;
  background: #FFF;
  font-size: 14px;
  cursor: pointer;
  width : 90px;
`;

const Icon = styled.img`
  position: absolute;
  left: 10px; 
  width: 18px;
  height: 18px;
  pointer-events: none;
  z-index: 1001;
`;

const DateCheck = styled.span`
  margin-left : 6px;
  margin-right : 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  margin-top :5px;
`;

const DateFilterButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #009857;
  background: ${({ isSelected }) => (isSelected ? "#009857" : "#FFF")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#009857")};
  cursor: pointer;
  font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%;
  transition: background 0.2s, color 0.2s;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
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
  padding: 10px 20px;
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
  border-radius: 8px;
  padding: 10px;
  min-height: 44px; 
  align-items: center; 
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #6A6A6A;
  background: #FFF;
  font-size: 14px;
  color: #6A6A6A;
`;

const SearchButton = styled.button`
  padding: 12px 32px;
  background: #009857;
  color: white;
  width: 112px;
 padding: 34px 40px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
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
    color: #009857 !important;
    font-weight: bold;
  }
`;
const ResetButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 76px;
  height : 90px;
  margin-right : 5px;
  margin-left : 5px;
  border-radius: 8px;
  border: 1px solid #009857;
  background: #FFF;
  color: #009857;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
`;

const ResetIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 4px;
`;