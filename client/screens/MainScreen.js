import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { fetchPosts } from '../api/api'


function SortSelect() {
    return (
        <View>

        </View>
    )
}

function PostItem({ post }) {

    const { content, photo, createdAt, person, likes, comments, views } = post
    return (
        <View style={styles.postItem}>
            <View style={styles.postHeader}>
                {/* <Image source={}/> */}
                <View style={styles.postPhoto} />
                <Text style={styles.postPerson}>{person.name}</Text>
                <Text style={styles.postCreatedAt}>{createdAt}</Text>
            </View>
            <Text style={styles.postContent}>{content}</Text>
            <View style={styles.postFooter}>
                <Text>Лайки: {likes.length}</Text>
                <Text>Просмотры: {views}</Text>
                <Text>Комменты: {comments.length}</Text>
            </View>
        </View>
    )
}

function PostList({ posts }) {
    return (
        <View style={styles.postList}>
            {posts.map((post, idx) => (
                <PostItem post={post} key={idx} />
            ))}
        </View>
    )
}

export default function MainScreen() {

    const categories = [
        { name: "статьи" },
        { name: "новости" },
        { name: "сообщества" },
        { name: "авторы" },
    ]

    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const data = await fetchPosts()
            console.log(data);
        })()
    }, [])


    return (
        <ScrollView>
            <View>
                <ScrollView horizontal={true} contentContainerStyle={styles.categories}>
                    {categories.map((categorie, id) => (
                        <TouchableOpacity key={id}>
                            <Text style={styles.categoriesName}>{categorie.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.searchBar}>
                    <TextInput style={styles.searchBarText} placeholder="Поиск" />
                </View>

                {/* Доработать */}
                {/* <SortSelect /> */}

                <PostList posts={posts} />

                <Text>
                    MainScreen
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categories: {
        backgroundColor: "#D9D9D9",
        paddingVertical: 20,
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    categoriesName: {
        color: "white",
        marginRight: 10,
        fontSize: 18,
        fontWeight: "bold"
    },

    searchBar: {
        padding: 15,
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
    },
    searchBarText: {
        color: "#7C7C7C",
        fontSize: 18
    },
    postList: {
        margin: 0
    },
    postItem: {
        borderColor: "#ADADAD",
        borderWidth: 1,
        padding: 20,
        marginBottom: 20
    },
    postHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    postPerson: {
        marginRight: 10,
        fontSize: 18
    },
    postPhoto: {
        width: 30,
        height: 30,
        backgroundColor: "#D9D9D9",
        borderRadius: 100,
        marginRight: 10
    },
    postCreatedAt: {
        marginRight: 10,
        color: "#818181",
    },
    postContent: {
        marginLeft: 40,
        color: "#000000",
        lineHeight: 25,
        marginBottom: 25
    },
    postFooter: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row"
    },
})