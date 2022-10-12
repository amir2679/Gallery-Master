'use strict'

var gProjs = [
    {
        id: makeId(),
        name: "Books Shop",
        title: "Book Shop CRUDL:",
        desc: "App that shows a list of books and let the user interact with it.",
        url: "Projects/Books Shop",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 1
    },

    {
        id: makeId(),
        name: "Mineswiper",
        title: "Mineswiper Game:",
        desc: "The famous Mineswiper game with some cool recursive function",
        url: "Projects/mineswiper",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 2
    },
    {
        id: makeId(),
        name: "Pacmen",
        title: "Pacmen Game:",
        desc: "Old but gold... the famous pacmen!",
        url: "Projects/pacmen",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 3
    },
    {
        id: makeId(),
        name: "Guess-Me",
        title: "Akinator Game:",
        desc: "Think of whatever character you want, our genie will try and find it...<br> If he dosnt find than he will try to learn for next time",
        url: "Projects/Guess-Me",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 4
    }]

    function getProjectById(id){
        const project = gProjs.find(project => project.id === id)
        return project
    }

    function getProjects(){
        return gProjs
    }