import React from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import ListRole from '../../components/ListRole'
import type { Role } from '../../model'
import * as roleService from "../../services/role.service"
import ListItem from '../../components/ListItem'
import * as authRepo from '../../services/auth.repo'

export default function ListRolePage() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [roles, setRoles] = React.useState<Role[]>([])

    function fetchRoles() {
        roleService.getList().then(list => {
            setRoles(list ? list : [])
        }).catch(error => {
            console.error(error)
            navigation.goBack
        })
    }

    React.useEffect(() => {
            navigation.addListener('focus', fetchRoles)
            authRepo.getSession().then(session => {
                if (!session) navigation.goBack()
    
                navigation.setOptions({
                    title: session ? `Olá ${session.name}` : 'Página Inicial',
                })
            })
    
            navigation.setOptions({
                headerLeft: () => <Button title='Sair' onPress={() => navigation.goBack()} />,
                headerRight: () => <Button title='Add' onPress={() => navigation.navigate('user')} />
            })
        }, [])

    function update(role: Role) {
        navigation.navigate('home')
    }
    
    function remove(role: Role) {
        roleService.remove(role.id!).then(deleted => {
            if (deleted) fetchRoles()
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listagem de Roles</Text>
            <Text>{roles.length} usuários cadastrados.</Text>
            <View>
                <FlatList
                    data={roles}
                    keyExtractor={role => role.id!.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            onUpdate={() => update(item)}
                            onDelete={() => remove(item)}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
})