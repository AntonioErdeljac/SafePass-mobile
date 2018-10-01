import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { isEqual } from 'lodash';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 25,
    width: '100%',
  },
  autocompleteContainer: {
    left: 25,
    position: 'absolute',
    right: 25,
    top: 0,
    zIndex: 1,
    height: 'auto',
    width: '87%',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    margin: 10,
    color: 'black',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    marginTop: 25,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    padding: 30,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'calibri',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
});

class AutocompleteExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: props.data,
      hideItems: false,
      query: '',
    };
  }

  componentWillReceiveProps(newProps) {
    const { data } = this.props;

    if (!isEqual(newProps.data, data)) {
      this.setState({
        films: newProps.data,
      });
    }
  }

  handleSelect = (item) => {
    const { handleSelect } = this.props;

    this.setState({ query: item.label, hideItems: true });
    handleSelect(item);
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.label.search(regex) >= 0);
  }

  static renderFilm() {
    return (
      <View>
        <Text style={styles.titleText}>&nbsp;</Text>
      </View>
    );
  }

  render() {
    const { query, hideItems } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a && a.label && a.label.toLowerCase().trim() === b && b.label && b.label.toLowerCase().trim();

    return (
      <View style={[styles.container, { height: films.length && !hideItems > 0 ? films.length * (films.length === 1 ? 110 : 25) : 70 }]}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{ borderWidth: 0, borderBottomWidth: 1, borderColor: 'black' }}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0]) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text, hideItems: false })}
          placeholder="Postcode"
          placeholderTextColor="black"
          renderItem={item => (hideItems
            ? null
            : (
              <TouchableOpacity onPress={() => this.handleSelect(item)}>
                <Text style={styles.itemText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            AutocompleteExample.renderFilm(films[0])
          ) : null}
        </View>
      </View>
    );
  }
}

export default AutocompleteExample;
