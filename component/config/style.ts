import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    container: { width: '100%', height: 100 },
    scroll: { width: '100%' },
    box: { width: 100, height: 100, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    iconbox: { width: 20, height: 20, marginBottom: 10, alignItems: 'center', justifyContent: 'center'  },
    icon: { color: '#000', fontSize: 20 },
    text: { fontSize: 12, fontWeight: 'bold', color: '#333' },
});

// 弹框样式
export const modalStyle = StyleSheet.create({
    container: { width: '100%', flexDirection: 'column', flex: 1 },
    closeBox: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingHorizontal: 20, paddingVertical: 10 },
    closeText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    configListBox: { flex: 1, width: '100%' },
    configItem: { backgroundColor: 'red' },
});

export default styles;
