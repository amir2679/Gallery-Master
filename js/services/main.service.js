'use strict'

var gProjs = [
    {
        id: makeId(),
        name: "Books Shop",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "Projects/Books Shop",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 1
    },

    {
        id: makeId(),
        name: "mineswiper",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "Projects/mineswiper",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 2
    },
    {
        id: makeId(),
        name: "pacmen",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "Projects/pacmen",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
        idx: 3
    },
    {
        id: makeId(),
        name: "Guess-Me",
        title: "Better push those boxes",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
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