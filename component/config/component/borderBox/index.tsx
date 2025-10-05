import useModal from '@ant-design/react-native/lib/modal/useModal';
import { CanvasOption } from '../../../../hook/canvas';

interface BorderBoxProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
}

const BorderBox: React.FC<BorderBoxProp> = ({ option, modal }) => {
  return (
    <div />
  );
};

export default BorderBox;
