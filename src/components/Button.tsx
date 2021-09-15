import React from "react";
import{
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native'

// type ButtonProps = TouchableOpacityProps;

interface ButtonProps extends TouchableOpacityProps { 
    title: string;
}
export function Button({title, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity 
            style={styles.button}
             activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor:'#23D962',
        padding:15,
        borderRadius:50,
        alignItems:'center',
        marginTop:25
    },
    buttonText: {
        color: '#000000',
        fontSize:18,
        fontWeight:'bold'
    },
})