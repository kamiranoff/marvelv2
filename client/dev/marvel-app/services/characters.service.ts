export class CharactersService {
  public getCharacters() {
    return [{
      character: {
        id: 1,
        name: 'Jean Grey',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "Jean Grey is Phoenix"
        }
      }
    }, {
      character: {
        id: 2,
        name: 'Psylocke',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "So pretty"
        }
      }
    },{
      character: {
        id: 1,
        name: 'Jean Grey',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "Jean Grey is Phoenix"
        }
      }
    }, {
      character: {
        id: 2,
        name: 'Psylocke',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "So pretty"
        }
      }
    },{
      character: {
        id: 1,
        name: 'Jean Grey',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "Jean Grey is Phoenix"
        }
      }
    }, {
      character: {
        id: 2,
        name: 'Psylocke',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "So pretty"
        }
      }
    },{
      character: {
        id: 1,
        name: 'Jean Grey',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "Jean Grey is Phoenix"
        }
      }
    }, {
      character: {
        id: 2,
        name: 'Psylocke',
        thumbnail: {
          path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
          extension: "jpg"
        },
        wiki: {
          bio: "So pretty"
        }
      }
    }]
  }
  getCharacterById(id) {
    var characters = this.getCharacters();

    return characters.filter(function(v) {
      return v.character.id === id; // Filter out the appropriate one
    })[0]
  }
}


