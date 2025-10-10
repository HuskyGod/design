import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, Panel3 } from 'reanimated-color-picker';

export default function App() {
  const [showModal, setShowModal] = useState(false);

  // Note: use `onCompleteJS` and `onChangeJS` for non-worklet functions
  const onSelectColor = ({ hex }) => {
    'worklet';
    // do something with the selected color.
    console.log(hex);
  };

  return (
    <View style={styles.container}>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="slide">
        <ColorPicker style={{ width: '70%', height: '30%' }} value="red" onComplete={onSelectColor}>
          <View style={{ display: 'flex', flexDirection: 'row', height: '100%', padding: 20 }}>
            <Panel3 style={{ flex: 1, height: '100%' }} />
            <OpacitySlider style={{ marginLeft: 20, height: '100%', borderRadius: 20 }} vertical />
          </View>
        </ColorPicker>

        <Button title="Ok" onPress={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
