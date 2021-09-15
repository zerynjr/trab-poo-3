import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  { Button }  from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface Cadastro{
    id: string,
    name: string,
    email: string,
    telefone: string
}


export function Home() {
    const [newNomes, setNewNomes] = useState('')
    const [myNomes, setMyNomes] = useState<Cadastro[]>([])
    const [newEmails, setNewEmails] = useState('')
    const [myEmails, setMyEmails] = useState<Cadastro[]>([])
    const [newTelefones, setNewTelefones] = useState('')
    const [myTelefones, setMyTelefones] = useState<Cadastro[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNew(){
        const Lista = {
            id: String(new Date().getTime()),
            name: newNomes,
            email: newEmails,
            telefone: newTelefones,
        }
        setMyNomes([...myNomes,Lista])
        setNewNomes('')
        setMyEmails([...myEmails,Lista])
        setNewEmails('')
        setMyTelefones([...myTelefones,Lista])
        setNewTelefones('')
    }

    function handleRemove(id: string){
        setMyNomes(myNomes.filter(Cadastro=> Cadastro.id !== id))

    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >=5 && currentHour < 12){
            setGreeting('Olá, Bom dia')
        }else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Olá, Boa Tarde')
        } else {
            setGreeting('Olá, Boa Noite')
        }
    }, [])

    useEffect(() => {
        async function loadData() {
            const storagedSkills = await AsyncStorage.getItem('@myNomes:Nomes')
            if(storagedSkills){
                setMyNomes(JSON.parse(storagedSkills))
            }
        }
        loadData()
    }, [])

    useEffect (() =>{
        async function saveData(){
            await AsyncStorage.setItem('@myNomes:Nomes', JSON.stringify(myNomes))
        }
        saveData()
    },[myNomes])

  return(
    <>
        <View style={styles.container}>
            <Image style={{ width:100, height:30, alignSelf: 'center', justifyContent: 'center', marginBottom: 20}} source={require('../assets/Spotify.png')}/>

            <Text style={[styles.title, { alignSelf:'center', marginTop:30 }]}>Inscreva-se grátis e comece a</Text>
            <Text style={[styles.title, { alignSelf:'center', marginBottom: 20 }]}>curtir.</Text>
            <Text style={styles.greetings}>
                {greeting}
            </Text>
        
            <Text style={[styles.perguntas, { marginTop: 20 }]}>Qual o nome?</Text>
            <TextInput
            style={styles.input}
            placeholder= 'Insira o nome do perfil.'
            value={newNomes}
            placeholderTextColor='#555'
            onChangeText={value => setNewNomes(value)}
            />

            <Text style={[styles.perguntas, { marginTop: 20 }]}>Qual o email?</Text>
            <TextInput
            style={styles.input}
            placeholder= 'Insira o email.'
            value={newEmails}
            placeholderTextColor='#555'
            onChangeText={value => setNewEmails(value)}
            />

            <Text style={[styles.perguntas, { marginTop: 20 }]}>Qual o telefone?</Text>
            <TextInput
            style={styles.input}
            placeholder= 'Insira o telefone.'
            value={newTelefones}
            placeholderTextColor='#555'
            onChangeText={value => setNewTelefones(value)}
            />

            <Button 
            onPress={handleAddNew}
            title = 'Inscrever'
            />

                       
            <Text style={[styles.title, {marginVertical:20}]}>
                Contas Inscritas
            </Text>
            
            <FlatList showsVerticalScrollIndicator={false}
            data={myNomes}
            keyExtractor={item=> item.id}
            renderItem={({item})=> ( 
                <SkillCard
                Nome={item.name}
                Email={item.email}
                Telefone={item.telefone}
                onPress={() => handleRemove(item.id)}
                />
            )}
            />
        </View>
    </>
  )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#ffffff',
        paddingHorizontal:30,
        paddingVertical: 70
    },
    title: {
        color:'#000000',
        fontSize:23,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor:'#dfdfdf',
        color: '#000000',
        fontSize: 18,
        padding: Platform.OS =='ios' ? 15 : 12,
        marginTop: 5,
        borderRadius: 5,
        borderColor:'#000000'
    },
    greetings: {
        color: '#000000',
        fontSize: 20,
        alignSelf: 'center'
    }, 
    perguntas: {
        fontWeight: 'bold',
        marginBottom: 7,
    }
})