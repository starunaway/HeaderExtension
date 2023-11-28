import { Rule, RuleValueKey } from '@/shared/storages/ruleStorage';
import { IMenu } from '@/constants';
import { Switch, Tooltip } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, TriangleDownIcon, TriangleUpIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export interface IBaseRuleProps {
  ruleInfo: {
    id: string;
    rules: Rule[RuleValueKey];
    showComment?: boolean;
  } & IMenu;
}

interface HeaderProps extends IBaseRuleProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
}

const RuleContentHeader = (props: HeaderProps) => {
  const {
    ruleInfo: { id, rules, showComment, name },
    show,
    onShowChange,
  } = props;

  return (
    <div className="flex  items-center mb-8 justify-between">
      <div className="flex items-center">
        <Switch mr={2}></Switch>
        <h4 className="text-16">{name}</h4>

        {show ? (
          <TriangleDownIcon onClick={() => onShowChange(!show)} />
        ) : (
          <TriangleUpIcon onClick={() => onShowChange(!show)} />
        )}
      </div>

      <div className="flex">
        <Tooltip label="Add Rule">
          <AddIcon boxSize={3.5} mr={2} />
        </Tooltip>
        <Tooltip label="Delete Rule Group">
          <DeleteIcon boxSize={3.5} mr={2} />
        </Tooltip>
        <Tooltip label="Show Comment">
          {showComment ? <ViewIcon boxSize={3.5} /> : <ViewOffIcon boxSize={3.5} />}
        </Tooltip>
      </div>
    </div>
  );
};

export default RuleContentHeader;
