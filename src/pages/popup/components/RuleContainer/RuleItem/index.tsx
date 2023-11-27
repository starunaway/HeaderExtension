import { Rule } from '@root/src/shared/storages/ruleStorage';

interface Props {
  rule: Rule;
  onChange?: (rule: Rule) => void;
}
const RuleItem = (props: Props) => {
  const { rule } = props;

  return <div>{rule.name}</div>;
};
export default RuleItem;
