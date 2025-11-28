import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import RightActions from './RightActions'

type Props = {
    title: string
    subtitle: string
    roles?: string[]
    onUpdate: () => void
    onDelete: () => void
}

export default function ListItem({ title, subtitle, onUpdate, onDelete, roles }: Props) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => <RightActions onUpdate={onUpdate} onDelete={onDelete} />}>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{title} </Text>
                    <Text style={styles.itemSubtitle}>{subtitle}</Text>
                    <Text style={styles.itemSubtitle}>{roles}</Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 10,
    },
    itemTitle: {
        fontSize: 18,
    },
    itemSubtitle: {
        color: '#555',
        fontWeight: 'bold',
    },
})