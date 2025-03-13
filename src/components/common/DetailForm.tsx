import React from "react";
import styled from "styled-components";

interface DetailFormProps {
    formValues: {
        totalSupplyAmount: string;
        totalTaxAmount: string;
        totalAmount: string;
        creationDate: string;
        creationTime: string;
    };
    onInputChange: (
        field: "totalSupplyAmount" | "totalTaxAmount" | "totalAmount" | "creationDate" | "creationTime",
        value: string
    ) => void;
    onClearInput: (
        field: "totalSupplyAmount" | "totalTaxAmount" | "totalAmount" | "creationDate" | "creationTime"
    ) => void;
}

const DetailForm: React.FC<DetailFormProps> = ({
                                                   formValues,
                                                   onInputChange,
                                                   onClearInput,
                                               }) => {
    return (
        <DetailFormContainer>
            <SubTitle>지급결의서 추가 정보</SubTitle>
            <InputRow>
                <label>총 공금가액 합계</label>
                <InputWrapper>
                    <input
                        placeholder="000-00-00000"
                        value={formValues.totalSupplyAmount}
                        onChange={(e) => onInputChange("totalSupplyAmount", e.target.value)}
                    />
                    {formValues.totalSupplyAmount && (
                        <RemoveButton onClick={() => onClearInput("totalSupplyAmount")}>
                            ×
                        </RemoveButton>
                    )}
                </InputWrapper>
            </InputRow>
            <InputRow>
                <label>총 세액합계</label>
                <InputWrapper>
                    <input
                        placeholder="000-00-00000"
                        value={formValues.totalTaxAmount}
                        onChange={(e) => onInputChange("totalTaxAmount", e.target.value)}
                    />
                    {formValues.totalTaxAmount && (
                        <RemoveButton onClick={() => onClearInput("totalTaxAmount")}>
                            ×
                        </RemoveButton>
                    )}
                </InputWrapper>
            </InputRow>
            <InputRow>
                <label>총액</label>
                <InputWrapper>
                    <input
                        placeholder="000-00-00000"
                        value={formValues.totalAmount}
                        onChange={(e) => onInputChange("totalAmount", e.target.value)}
                    />
                    {formValues.totalAmount && (
                        <RemoveButton onClick={() => onClearInput("totalAmount")}>
                            ×
                        </RemoveButton>
                    )}
                </InputWrapper>
            </InputRow>
            <InputRow>
                <label>생성일</label>
                <InputWrapper>
                    <input
                        placeholder="000-00-00000"
                        value={formValues.creationDate}
                        onChange={(e) => onInputChange("creationDate", e.target.value)}
                    />
                    {formValues.creationDate && (
                        <RemoveButton onClick={() => onClearInput("creationDate")}>
                            ×
                        </RemoveButton>
                    )}
                </InputWrapper>
            </InputRow>
            <InputRow>
                <label>생성시간</label>
                <InputWrapper>
                    <input
                        placeholder="000-00-00000"
                        value={formValues.creationTime}
                        onChange={(e) => onInputChange("creationTime", e.target.value)}
                    />
                    {formValues.creationTime && (
                        <RemoveButton onClick={() => onClearInput("creationTime")}>
                            ×
                        </RemoveButton>
                    )}
                </InputWrapper>
            </InputRow>
        </DetailFormContainer>
    );
};

export default DetailForm;

const DetailFormContainer = styled.div`
    border: 2px solid var(--gray-300, #E5E5E4);
    border-radius: 16px;
    padding: 24px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        width: 140px;
        color: var(--primary-main-200, #009857);
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: 500px;

    input {
        width: 100%;
        padding: 15px 40px 15px 10px;
        border: 2px solid #ddd;
        border-radius: 10px;
        background-color: #F8F8F9;
        color: ${({ theme }) => theme.colors.main200};
        font-size: ${({ theme }) => theme.typography.bodyL.fontSize};
        font-weight: ${({ theme }) => theme.typography.bodyL.fontWeight};
        box-sizing: border-box;
        text-indent: 1rem;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        color: #777;
    }
`;

const SubTitle = styled.h3`
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.typography.titleL.fontSize};
    font-weight: ${({ theme }) => theme.typography.titleL.fontWeight};
`;
