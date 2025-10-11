import { CanvasOption, CanvasType } from '../../../../hook/canvas';
import { useModal } from '../../../../hook/modal';
import { Text, TouchableHighlight, View } from 'react-native';
import ModalBox from '../../../ModalBox/index';
import { Checkbox, Flex, Stepper, StepperProps } from '@ant-design/react-native';
import styles from './style';
import ColorBox from '../../../colorBox';

interface BoxProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
}

const ShadowBox: React.FC<BoxProp> = ({ modal, option }) => {
  const colorModal = useModal();

  const onChange = (value: CanvasType['shadow']) => {
    console.log(option.activeObject?.border?.color);
    option.setShadow(value);
  };

  if (!modal.open) {return null;}

  return (
      <Flex style={styles.box} align="start">
        <View style={styles.item}>
          <View><Text style={styles.title}>X轴</Text></View>
          <View><Stepper value={option.activeObject?.shadow?.dx || 0} style={styles.input} onChange={(value) => onChange({ ...option.activeObject!.shadow, dx: value })} /></View>
          <View><Text style={[styles.title]}>内阴影</Text></View>
          <View><Checkbox style={{ width: 30, height: 30 }} checked={option.activeObject?.shadow?.inner} onChange={(event) => onChange({ ...option.activeObject!.shadow, inner: event.target.checked })} /></View>
          <View><Text style={styles.title}>模糊</Text></View>
          <View><Stepper value={option.activeObject?.shadow?.blue || 0} style={styles.input} onChange={(value) => onChange({ ...option.activeObject!.shadow, blue: value })} /></View>
        </View>
        <View style={[styles.item, { marginLeft: 20 }]}>
          <View><Text style={styles.title}>Y轴</Text></View>
          <View><Stepper value={option.activeObject?.shadow?.dy || 0} style={styles.input} onChange={(value) => onChange({ ...option.activeObject!.shadow, dy: value })} /></View>
          <View><Text style={[styles.title]}>颜色</Text></View>
          <TouchableHighlight onPressIn={() => colorModal.onShow()} ><View style={[styles.colorBox, { backgroundColor: option.activeObject?.shadow?.color }]}  /></TouchableHighlight>
        </View>
        <ColorBox modal={colorModal} onFinish={(hex: string) => onChange({ ...option.activeObject!.shadow, color: hex })} value={option.activeObject?.shadow?.color} />
      </Flex>
  );
};

export default ShadowBox;
