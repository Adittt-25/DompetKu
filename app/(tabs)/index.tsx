import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView
} from 'react-native';

export default function App() {
  const [transaksi, setTransaksi] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [nominal, setNominal] = useState('');
  const nextId = React.useRef(1);

  const hitungSaldo = () =>
    transaksi.reduce((acc, t) =>
      acc + (t.tipe === 'masuk' ? t.nominal : -t.nominal), 0);

  const tambahTransaksi = (tipe) => {
    if (!deskripsi.trim() || !nominal || isNaN(Number(nominal))) return;
    const baru = {
      id: String(nextId.current++),
      ket: deskripsi,
      nominal: Number(nominal),
      tipe,
    };
    setTransaksi(prev => [baru, ...prev]);
    setDeskripsi('');
    setNominal('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Total Saldo</Text>
        <Text style={styles.headerSaldo}>
          Rp {hitungSaldo().toLocaleString('id-ID')}
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi (contoh: Beli Makan)"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
        <TextInput
          style={styles.input}
          placeholder="Nominal (contoh: 50000)"
          value={nominal}
          onChangeText={setNominal}
          keyboardType="numeric"
        />
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.btnMasuk}
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.btnText}>+ Pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnKeluar}
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.btnText}>- Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.txItem}>
            <Text style={styles.txDesc}>{item.ket}</Text>
            <Text style={item.tipe === 'masuk' ? styles.masuk : styles.keluar}>
              {item.tipe === 'masuk' ? '+' : '-'} Rp {item.nominal.toLocaleString('id-ID')}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada transaksi.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a6e8e',
    padding: 24,
    alignItems: 'center',
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  headerSaldo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 4,
  },
  form: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 12,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  btnRow: {
    flexDirection: 'row',
  },
  btnMasuk: {
    flex: 1,
    backgroundColor: '#1a7a45',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 4,
  },
  btnKeluar: {
    flex: 1,
    backgroundColor: '#b03020',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginHorizontal: 16,
    marginBottom: 4,
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 14,
    borderRadius: 10,
  },
  txDesc: {
    fontSize: 14,
    color: '#222',
    flex: 1,
  },
  masuk: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a7a45',
  },
  keluar: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b03020',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});