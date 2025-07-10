//import liraries
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';

interface Props {
    onClick: () => void
    children?: React.ReactNode | React.ReactNode[]
}

// create a component
const ButtomBox: React.FC<Props> = ({ onClick, children }) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={styles.btnText}>{children}</Text>
        </TouchableOpacity>
    );
};

//make this component available to the app
export default ButtomBox;
