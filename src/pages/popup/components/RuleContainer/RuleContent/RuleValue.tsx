import { Input } from '@chakra-ui/react';

interface IProps {
  fields: string[];
  showComment: boolean;
  value: Record<string, any>;
  onValueChange: (field: string, value: string | string[]) => void;
}

const RuleValue = (props: IProps) => {
  const { fields, showComment, value, onValueChange } = props;

  return (
    <>
      {fields.map((field, index) => {
        if (['name', 'value'].includes(field)) {
          return (
            <Input
              className="ruleInput"
              onChange={e => {
                onValueChange(field, e.target.value);
              }}
              value={value[field] || ''}
              placeholder={field}></Input>
          );
        }
        return null;
      })}

      {showComment && (
        <Input
          onChange={e => {
            onValueChange('comment', e.target.value);
          }}
          className="ruleInput"
          value={value['comment'] || ''}
          placeholder="comment"></Input>
      )}
    </>
  );
};
export default RuleValue;
