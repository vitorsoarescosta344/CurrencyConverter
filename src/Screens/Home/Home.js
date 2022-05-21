import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, View, Text, Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {getSimbols} from '../../Services/simbol.service';
import styles from './styles';
import {Card, ActivityIndicator} from 'react-native-paper';
import Select from '../../Components/Select';
import {convertCurrency} from '../../Services/convert.service';
import Loading from '../Loading';
import {format} from 'date-fns';
import {Format} from '../../Utils';

export default function Home() {
  const [currencyA, setCurrencyA] = useState('BRL');
  const [currencyAValue, setCurrencyAValue] = useState('1');
  const [currencyB, setCurrencyB] = useState('USD');
  const [currencyBValue, setCurrencyBValue] = useState('');
  const [result, setResult] = useState('0,005');
  const [simbolsItems, setSimbolsItems] = useState([]);
  const [cardTitle, setCardTitle] = useState({
    title: `1 ${currencyA} igual a`,
    subtitle: `${result} ${currencyB}`,
  });
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());

  async function simbols() {
    const res = await getSimbols();

    let simbolsArr = [];

    Object.keys(res.symbols).forEach(item => {
      simbolsArr.push({label: `${item} ${res.symbols[item]}`, value: item});
    });
    //console.log(simbolsArr);
    setSimbolsItems(simbolsArr);
  }

  function getCardInfo() {
    console.log({currencyA});
    const card = {
      title: `1 ${currencyA} igual a`,
      subtitle: `${Format({
        value: currencyBValue,
        currency: currencyB,
      })} ${currencyB}`,
    };

    setCardTitle(card);
  }

  async function convert() {
    const {info, success, date} = await convertCurrency({
      from: currencyA,
      to: currencyB,
      amount: currencyAValue,
    });

    const {timestamp, rate} = info;

    setCurrencyBValue(rate.toString());

    const dateTime = new Date(date);
    setTime(dateTime);

    if (success === false) {
      Alert.alert('Falha em obter dados');
    }
  }

  useEffect(() => {
    setLoading(true);
    convert();
    getCardInfo();
    simbols();
    setLoading(false);
  }, []);

  useEffect(() => {
    getCardInfo();
  }, [currencyA, currencyB]);

  useEffect(() => {
    convert();
  }, [currencyA]);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <Card style={styles.containerTop}>
        <Card.Title title={cardTitle.title} subtitle={cardTitle.subtitle} />
        <Text style={{color: 'gray', marginLeft: 15}}>
          {format(time, 'dd/MM/yyyy')}
        </Text>
      </Card>

      <ScrollView style={{flex: 1, marginTop: 20}}>
        <View style={styles.inputRow}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.textInput}
              value={Format({value: currencyAValue, currency: currencyA})}
              onChangeText={text => setCurrencyAValue(Format(text))}
            />
          </View>
          <View style={styles.containerPicker}>
            <Select
              onChange={() => setCurrencyA()}
              value={currencyA}
              items={simbolsItems}
            />
          </View>
        </View>
        <View style={[styles.inputRow, {marginTop: 20}]}>
          <View style={styles.containerInput}>
            <TextInput
              style={styles.textInput}
              value={Format({value: currencyBValue, currency: currencyB})}
              onChange={text =>
                setCurrencyBValue(Format({value: text, currency: currencyB}))
              }
            />
          </View>
          <View style={styles.containerPicker}>
            <Select
              onChange={() => setCurrencyB()}
              value={currencyB}
              items={simbolsItems}
            />
          </View>
        </View>
        <View style={styles.inputRow}></View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
