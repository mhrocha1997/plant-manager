import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button} from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const navigation = useNavigation();
    const [isFocused, setFocused] = useState(false);
    const [isFilled, setFilled] = useState(false);
    const [name,setName] = useState<string>();

    function handleInputBlur(){
        setFocused(false);
        setFilled(!!name)
    }

    function handleInputFocus(){
        setFocused(true);
    }

    function handleInputChange(value: string){
        setFocused(!!value);
        setName(value);
    }


    async function handleSubmit(){
        if(isFilled){
            try{
                await AsyncStorage.setItem('@plantmanager:user', name);
                navigation.navigate('Confirmation',{
                    title: 'Prontinho',
                    subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScreen: 'PlantSelect'
                });
            }catch{
                Alert.alert('Não foi possível salvar o seu nome. 😓');
                
            }
            
        } else {
            
            Alert.alert('Me diz como chamar você 😓');
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}> 
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😃'}      
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>
                            <TextInput 
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && {borderColor: colors.green}
                                    ]}
                                    placeholder="Digite seu nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title='Confirmar'
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji:{
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center'
    }
});