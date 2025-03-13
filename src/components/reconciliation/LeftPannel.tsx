import styled from "styled-components";
import { transparentize } from "polished";
import { useReconciliationStore, InvoiceItem } from "@store/reconciliationStore";


interface LeftPanelProps {
    onSelect: (id: number) => void;
    onCheck: (id: number, checked: boolean) => void;
    onSelectAll: (checked: boolean) => void;
    onDeleteClick: () => void;
}

const LeftPanel = ({ onSelect, onCheck, onSelectAll, onDeleteClick }: LeftPanelProps) => {
    const { list, selectedId, checkedIds } = useReconciliationStore();

    const allChecked = list.length > 0 && list.every((item) => checkedIds.includes(item.id));

    return (
        <LeftPanelContainer>
            <LeftTitle>총 {list.length}건</LeftTitle>
            <ActionRow>
                <SelectAllCheckbox
                    type="checkbox"
                    checked={allChecked}
                    onChange={(e) => onSelectAll(e.target.checked)}
                />
                <DeleteButton onClick={onDeleteClick}>전체삭제</DeleteButton>
            </ActionRow>
            <ScrollArea>
                {list.map((item: InvoiceItem) => {
                    const isSelected = item.id === selectedId;
                    const isChecked = checkedIds.includes(item.id);
                    return (
                        <ListItem
                            key={item.id}
                            selected={isSelected}
                            onClick={() => onSelect(item.id)}
                        >
                            <Checkbox
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    onCheck(item.id, e.target.checked);
                                }}
                            />
                            <ListItemContent>
                                <TitleRow>
                                    <TruncatedSpan>{item.suName}</TruncatedSpan>
                                    <Divider>|</Divider>
                                    <TruncatedSpan>{item.ipName}</TruncatedSpan>
                                </TitleRow>
                                <MetaRow>
                                    <span>PDF</span>
                                    <Divider>|</Divider>
                                    <span>{formatIssueDate(item.issueDate)}</span>
                                </MetaRow>
                            </ListItemContent>
                        </ListItem>
                    );
                })}
            </ScrollArea>
        </LeftPanelContainer>
    );
};

export default LeftPanel;


const formatIssueDate = (dateStr: string) => {
    if (dateStr.length === 8) {
        return `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`;
    }
    return dateStr;
};

const LeftPanelContainer = styled.div`
  width: 300px;
  border-right: 1px solid #ddd;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  border-radius: 16px 0 0 16px;
  overflow-y: auto;
`;

const LeftTitle = styled.h2`
  padding: 16px;
  font-size: 1.5rem;
  color: #333;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
`;

const SelectAllCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #009857;
  font-weight: bold;
  cursor: pointer;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

interface ListItemProps {
    selected: boolean;
}

const ListItem = styled.div<ListItemProps>`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? transparentize(0.8, "#009857") : "transparent")};

  &:hover {
    background-color: ${({ selected }) => (selected ? transparentize(0.2, "#009857") : transparentize(0.2, "#f9f9f9"))};
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 1rem;
  height: 1rem;
`;

const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TruncatedSpan = styled.span`
  max-width: 7ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: #999;
`;

const Divider = styled.span`
  color: #ccc;
`;
