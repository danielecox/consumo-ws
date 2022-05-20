import React, { useState } from 'react';
import { StyleSheet,  View, TextInput, Button, FlatList, Text } from 'react-native';
import PrevisaoItem from './componentes/previsaoItem';

export default function App() {
  const endpoint = "https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q=";// endereço que consome o WEBSERVICE.
  const apikey = "KEY de ACESSO";

  const obterPrevisoes = () => {
    setPrevisoes([])
    const target = endpoint + cidade + '&appid=' + apikey;
    fetch(target)
    .then(dados => dados.json())
    .then(dados => setPrevisoes([dados]));
  }

  const [ cidade, setCidade ] = useState('');
  const [ previsoes, setPrevisoes ] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput 
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade"
          onChangeText={capturarCidade}
        />
        <Button
          title="OK"
          onPress={obterPrevisoes}
        />
      </View>
      <FlatList 
        data={previsoes}
        renderItem={
          previsao => <PrevisaoItem previsao={previsao.item}></PrevisaoItem>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  entrada: {
    flexDirection: 'column'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    marginBottom: 4,
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 40
  }
});