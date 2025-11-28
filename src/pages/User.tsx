import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import * as service from '../services/user.service';
import MyInput from '../components/MyInput';
import { User } from "../model";
import { Role } from "../model";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    let user: User | null = null
    const params = route.params as { user?: User }
    if (params && params.user) user = params.user

    const [name, setName] = React.useState(user ? user.name : '')
    const [username, setUsername] = React.useState(user ? user.username : '')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [listRoles, setListRoles] = React.useState<Role[]>([])
    const [roles, setRoles] = React.useState<string[]>([])

    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selecionadas = Array.from(event.target.selectedOptions).map(
            (opt) => opt.value
        )
        setRoles(selecionadas)
    }

    function save() {
        if (name === '') {
            alert('Nome é requerido!');
            return;
        }
        if (user) {
            const editUser: User = { id: user.id, username, name }

            service.update(editUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao alterar o usuário: ', error)
            })

        } else {
            if (username === '') {
                alert('Login é requerido!');
                return;
            }
            if (password === '') {
                alert('Senha é requerida!');
                return;
            }
            if (password !== confirmPassword) {
                alert('Senhas não conferem!');
                return;
            }
        
            const newUser: User = { username, name, password }

            service.create(newUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao criar usuário: ', error)
            })
        }
    }

    return (
        <View style={styles.container}>
            <MyInput label="Login" value={username} onChangeText={setUsername} readOnly={!!user} />
            <MyInput label="Nome" value={name} onChangeText={setName} />

            { !user && (
                <>
                    <MyInput label="Senha" onChangeText={setPassword} secureTextEntry />
                    <MyInput label="Confirmar Senha" onChangeText={setConfirmPassword} secureTextEntry />
                </>
            ) }          



            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={save} />
                <Button title="Cancelar" onPress={() => navigation.goBack()} />
                <Button title="Criar Role" onPress={() => navigation.navigate('role')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
});