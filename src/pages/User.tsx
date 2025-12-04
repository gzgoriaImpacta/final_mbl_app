import React from "react";
import { Button, StyleSheet, FlatList, Text, View } from "react-native";

import * as userservice from '../services/user.service';
import * as roleservice from '../services/role.service';
import MyInput from '../components/MyInput';
import { User } from "../models/model.user";
import { Role } from "../models/model.role";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import ListRoles from "../components/ListRole";

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
    const [roles, setRoles] = React.useState<string[]>(user?.roles ?? []);

    /*
    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
        roleservice.getList()
    }, []);
    */
    React.useEffect(() => {
        navigation.setOptions({ title: user ? 'Editar Usuário' : 'Novo Usuário' })
        roleservice.getList()
            .then(list => setListRoles(list))
            .catch(err => console.error("Erro ao carregar roles", err));
    }, []);

    function save() {
        if (name === '') {
            alert('Nome é requerido!');
            return;
        }
        if (user) {
            const editUser: User = { id: user.id, username, name, roles }

            userservice.update(editUser).then(success => {
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

            const newUser: User = { username, name, password, roles }

            userservice.create(newUser).then(success => {
                navigation.goBack()
            }).catch(error => {
                console.error('Erro ao criar usuário: ', error)
            })
        }
    }

    const renderItem = ({ item }: { item: Role }) => {
        //const backgroundColor = listRoles.map(role => role.id === item.id) ? '#6e3b6e' : '#f9c2ff';
        //const color = listRoles.map(role => role.id === item.id) ? 'white' : 'black';

        const isSelected = roles.includes(item.id!.toString());

        return (
            <ListRoles
                name={item.name}
                description={item.description}
                //onSelected={() => setRoles(roles.concat(item.id!.toString()))}
                //backgroundColor={backgroundColor}
                //textColor={color}
                onSelected={() => {
                    if (!isSelected) {
                        setRoles([...roles, item.id!.toString()]);
                    } else {
                        setRoles(roles.filter(r => r !== item.id!.toString()));
                    }
                }
                }
                backgroundColor={isSelected ? '#6e3b6e' : '#f9c2ff'}
                textColor={isSelected ? 'white' : 'black'}
            />
        );
    };

    return (
        <View style={styles.container}>
            <MyInput label="Login" value={username} onChangeText={setUsername} readOnly={!!user} />
            <MyInput label="Nome" value={name} onChangeText={setName} />

            {!user && (
                <>
                    <MyInput label="Senha" onChangeText={setPassword} secureTextEntry />
                    <MyInput label="Confirmar Senha" onChangeText={setConfirmPassword} secureTextEntry />
                </>
            )}

            <FlatList style={styles.fletlist}
                data={listRoles}
                keyExtractor={role => role.id!.toString()}
                renderItem={renderItem}
                extraData={roles}
            />

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
    fletlist: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        width: '60%',
        marginTop: 20,
    },
});