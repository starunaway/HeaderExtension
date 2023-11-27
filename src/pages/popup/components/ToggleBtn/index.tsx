import { Icon } from '@chakra-ui/react';
import { IoPlayCircleOutline, IoStopCircleOutline } from 'react-icons/io5';
import ruleStorage from '@/shared/storages/ruleStorage';
import useStorage from '@/shared/hooks/useStorage';

const ToggleBtn = () => {
  const rule = useStorage(ruleStorage);

  return (
    <div className="w-48 h-48 p-4">
      <Icon
        boxSize={10}
        onClick={() => {
          ruleStorage.toggle();
        }}
        color={rule.enabled ? 'green' : 'red'}
        as={rule.enabled ? IoPlayCircleOutline : IoStopCircleOutline}
      />
    </div>
  );
};

export default ToggleBtn;
