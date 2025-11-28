import React from 'react'
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import * as roleService from '../../services/role.service'
import MyInput from '../../components/MyInput'
import type { Role } from "../../model"

export default function RoleCreatePage() {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    let role: Role | null = null
    const params = route.params as { role?: Role }
    if (params && params.role) role = params.role

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        navigation.setOptions({ title: role ? 'Editar Role' : 'Nova Role' })
    }, [])

    function save() {
        if (name === '') {
            alert('Nome é requerido!');
            return;
        }

        if (role) {
            const editrole: Role = { id: role.id, name, description }

            roleService.update(editrole).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao alterar o usuário: ', error)
            })

        } else {
            if (name === '') {
                alert('Nome é obrigatório')
                return
            }
            if (description === '') {
                alert('Descrição é obrigatória')
                return
            }
            alert('Salvando role...')

            const role: Role = { name, description }

            roleService.create(role).then(success => {
                navigation.navigate('home')
            }).catch(error => {
                console.error('Erro ao criar usuário: ', error)
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criação de role</Text>
            <MyInput
                placeholder="Digite o nome da role"
                label="Nome" onChangeText={setName}
            />
            <MyInput
                placeholder="Digite a descrição da role"
                label="Description" onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
                <Button title="Salvar" onPress={save} />
                <Button title="Cancelar" onPress={() => navigation.navigate('roles')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '60%',
        marginTop: 20,
    },
})