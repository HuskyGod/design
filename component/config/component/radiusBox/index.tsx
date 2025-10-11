import { CanvasOption } from '../../../../hook/canvas';
import { useModal } from '../../../../hook/modal';
import { Text, TouchableHighlight, View } from 'react-native';
import { Flex, Stepper, StepperProps } from '@ant-design/react-native';
import styles from './style';
import ColorBox from '../../../colorBox';
import { useState } from 'react';

interface BorderBoxProp {
    modal: ReturnType<typeof useModal>,
    option: CanvasOption,
}

const RadiusBox: React.FC<BorderBoxProp> = ({ modal, option }) => {

  const onChange: StepperProps['onChange'] = (value: number) => {
    option.setRound({ value });
  };

  if (!modal.open) {return null;}

  return (
    <Flex style={styles.box} align="center">
      <View><Text style={styles.title}>宽</Text></View>
      <View><Stepper value={option.activeObject?.round?.value || 0} style={styles.input} onChange={onChange} /></View>
    </Flex>
  );
};

export default RadiusBox;
