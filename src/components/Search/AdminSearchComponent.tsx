import React,{useState} from "react";
import styled, { createGlobalStyle } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "@assets/icons/calendar.svg";
import resetIcon from "@assets/icons/reset.svg";
import cancelIcon from "@assets/icons/cancel.svg";
import token from "@utils/token";
import AdminListComponent from "@components/Search/AdminListComponent";
interface ListItem {
  id: number;
  employeeName: string;
  suName: string;
  ipName: string;
  erdatStart : string;
  erdatEnd: string;
}

const AdminSearchComponent: React.FC = () => {

  const [filters, setFilters] = useState({
    writer: "",
    supplier: "",
    recipient: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [searchResults, setSearchResults] = useState<ListItem[]>([]);
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const fetchSearchResults = async () => {
    const requestBody = {
      employeeName: filters.writer ? [filters.writer] : [],
      suNames: filters.supplier ? [filters.supplier] : null,
      ipNames: filters.recipient ? [filters.recipient] : null,
      erdatStart: formatDate(filters.startDate),
      erdatEnd: formatDate(filters.endDate),
    };
  
    console.log("전송할 requestBody:", requestBody);
  
    try {
      const response = await token.post("/v1/receipt/search", requestBody);
      console.log("검색 결과:", response.data);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };
  const [selectedFilter, setSelectedFilter] = useState<string | null>("전체");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  console.log(filterTags);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const filteredValue = value.slice(0, 8);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: filteredValue,
    }));
  };
  const handleDateChange = (date: Date | null, field: "startDate" | "endDate") => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: date,
    }));
  };
  
const handleClearField = (field: keyof typeof filters) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    [field]: field === "startDate" || field === "endDate" ? null : "",
  }));
};  
  
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);

    const today = new Date();
    let newStartDate: Date | null = new Date(today);
    let newEndDate: Date | null = new Date(today);

    switch (filter) {
      case "오늘":
        newStartDate = today;
        break;
      case "1주":
        newStartDate.setDate(today.getDate() - 7); 
        break;
      case "1개월":
        newStartDate.setMonth(today.getMonth() - 1); 
        break;
      case "3개월":
        newStartDate.setMonth(today.getMonth() - 3); 
        break;
      case "1년":
        newStartDate.setFullYear(today.getFullYear() - 1); 
        break;
    }

    setFilters((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate, 
    }));
};

  const handleReset = () => {
    setFilters({
      writer: "",
      supplier: "",
      recipient: "",
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
        <FirstColumn>
      <WriterInputContainer>
      <WriterLabel>작성자</WriterLabel>
      <WriterInput
    type="text"
    name="writer"
    placeholder="작성자명 입력하세요."
    value={filters.writer}
    onChange={handleChange}
  />
    {filters.writer && (
    <ClearIcon src={cancelIcon} alt="Clear" onClick={() => handleClearField("writer")} />
    )}
    </WriterInputContainer>
      <DateComponent>
      <DateLabel>기간</DateLabel> 
      <DateContainer>
          <DatePickerWrapper>
          <Icon src={calendar} alt="Calendar Icon" />
          <DatePicker
            selected={filters.startDate !== null ? filters.startDate : null}
            onChange={(date : any) => handleDateChange(date, "startDate")}
            dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            className="custom-datepicker"
          />
          </DatePickerWrapper>
          <DateCheck> ~ </DateCheck>
          <DatePickerWrapper>
          <Icon src={calendar} alt="Calendar Icon" />
          <DatePicker
          selected={filters.endDate !== null ? filters.endDate: null}
          onChange={(date : any) => handleDateChange(date, "endDate")}
           dateFormat="yyyy-MM-dd"
            placeholderText="YYYY-MM-DD"
            className="custom-datepicker"
            />
          </DatePickerWrapper>
          <ButtonContainer>
      {["오늘","1주","1개월","1년"].map((filter) => (
        <DateFilterButton
        key={filter}
        onClick={() => handleFilterClick(filter)}
        isSelected={selectedFilter === filter}
      >
        {filter}
      </DateFilterButton>
      ))}
    </ButtonContainer> 
        </DateContainer>
    </DateComponent>
    </FirstColumn>
<InputComponent>
    <InputContainer>
  <Label>공급자 사업체명</Label>
  <Input
    type="text"
    name="supplier"
    placeholder="지점명을 입력하세요."
    value={filters.supplier}
    onChange={handleChange}
  />
  {filters.supplier && (
    <ClearIcon src={cancelIcon} alt="Clear" onClick={() => handleClearField("supplier")} />
  )}
</InputContainer>
<InputContainer>
  <Label>공급받는자 사업체명</Label>
  <Input
    type="text"
    name="recipient"
    placeholder="대리점명 입력하세요."
    value={filters.recipient}
    onChange={handleChange}
  />
  {filters.recipient && (
    <ClearIcon src={cancelIcon} alt="Clear" onClick={() => handleClearField("recipient")} />
  )}
</InputContainer>
<CheckButtonContainer>
      <ResetButton onClick={handleReset}>
      <ResetIcon src={resetIcon} alt="초기화 아이콘" />
          </ResetButton>
          <SearchButton onClick={() =>fetchSearchResults()}>검색</SearchButton>
      </CheckButtonContainer>
  </InputComponent>
      </SearchBox>
      <ListContainer>
    <AdminListComponent data={searchResults} />
    </ListContainer>
    </SearchContainer>
  );
};

export default AdminSearchComponent;


const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #F8F8F9;
  padding: 16px;
  border-radius: 16px;
  @media (max-width: 1104px) {
    padding: 12px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 12px;
  gap : 10px;
  width: 406px;
`;
const WriterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 20px;
  gap : 10px;
  width: 180px;
  margin-right : 30px;
  margin-left : 20px;
`;

const Label = styled.label`
  display: flex;
width : 400px;
height: 19px;
flex-direction: column;
justify-content: center;
color: var(--gray-1600, #393C3C);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const WriterLabel = styled.label`
  display: flex;
width : 200px;
height: 19px;
flex-direction: column;
justify-content: center;
color: var(--gray-1600, #393C3C);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;


const DateLabel = styled(Label)`
  margin-right: 10px;
  width : 632px;
`;

const Input = styled.input`
  display: flex;
  width : 390px;
  height: 20px;
  padding: 10.5px 27.41px 10.5px 9px;
align-items: center;
border-radius: 4px;
border: 1px solid var(--gray-600, #A6A5A5);
background: var(--white, #FFF);
box-shadow: 0px 0px 0px 1px #FFF inset;
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
const WriterInput = styled.input`
  display: flex;
  width : 180px;
  height: 20px;
  padding: 10.5px 27.41px 10.5px 9px;
align-items: center;
border-radius: 4px;
border: 1px solid var(--gray-600, #A6A5A5);
background: var(--white, #FFF);
box-shadow: 0px 0px 0px 1px #FFF inset;
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
  flex-direction: row;
  margin-bottom: 12px;
  width : 632px;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 150px;
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
  margin-left : -10px;
  margin-right : 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  margin-top :10px;
`;
const CheckButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  margin-top :40px;
  z-index : 1001;
  margin-left : -10px;
`;

const DateFilterButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  height: 39px;
  padding: 10px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid ${({ isSelected }) => (isSelected ? "#009857" : "#A6A5A5")};
  background: ${({ isSelected }) => (isSelected ? "rgba(0, 152, 87, 0.10)" : "#FFF")};
  color: ${({ isSelected }) => (isSelected ? "#009857" : "#A6A5A5")};
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

const SearchButton = styled.button`
  display: flex;
width: 72px;
height: 39px;
padding: 10px 16px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 4px;
background: #009857;
border : none;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
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
  .custom-datepicker {
  width: 100%;
  padding: 10px 10px 10px 30px;
  border: 1px solid #777;
  border-radius: 4px;
  background: #FFF;
  font-size: 14px;
  cursor: pointer;
  width: 90px; 
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
height: 39px;
padding: 10px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 4px;
background: var(--gray-200, #F1F1F1);
border : none;
`;

const ResetIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-bottom: 4px;
`;

const ClearIcon = styled.img`
  position: absolute;
  right: 320px;
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const ListContainer = styled.div`
 margin-top : 40px;
`
const DateComponent =styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  gap: 10px;
  margin-top: 10px;
  margin-bottom : 20px;
  height : 60px;
  margin-left : 10px;
`
const InputComponent =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-left : 8px;
`
const FirstColumn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 12px;
  width : 1000px;
`;