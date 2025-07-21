// components/InvoicePDF.tsx
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Image,
} from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "../../helpers";
import { Sale } from "../../types"; // Asegurate de que incluya client, products, subtotal, iva, total, etc.

const styles = StyleSheet.create({
   page: {
      padding: 30,
      fontSize: 10,
      fontFamily: "Helvetica",
   },
   headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      alignItems: "center",
   },
   logo: {
      width: 300,
      height: 40,
      objectFit: "contain",
   },
   title: {
      fontSize: 16,
      textAlign: "right",
      fontWeight: "bold",
      color: "#003366",
   },
   section: {
      marginBottom: 8,
   },
   bold: {
      fontWeight: "bold",
   },
   line: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginVertical: 10,
   },
   tableHeader: {
      flexDirection: "row",
      backgroundColor: "#d3d3d3",
      borderWidth: 1,
      borderColor: "#000",
   },
   tableRow: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#000",
   },
   tableCell: {
      flex: 1,
      padding: 5,
      borderRightWidth: 1,
      borderColor: "#000",
   },
   totalSection: {
      marginTop: 10,
      alignSelf: "flex-end",
      width: "50%",
      borderWidth: 1,
      borderColor: "#000",
   },
   totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderBottomWidth: 1,
      borderColor: "#000",
   },
});

export default function InvoicePDF({ sale }: { sale: Sale }) {
   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.headerContainer}>
               <Image style={styles.logo} src="/LogoTexto.png" />
               <Text style={styles.title}>PRESUPUESTO</Text>
            </View>

            {/* Datos del remitente */}
            <View style={styles.section}>
               <Text style={styles.bold}>Romina Carla Fodera</Text>
               <Text>Triunvirato 5370, Villa Bosch. Buenos Aires (1682)</Text>
               <Text>115960-6813</Text>
               <Text>ecorganico.distribuidora@gmail.com</Text>
            </View>

            {/* Datos del receptor */}
            <View style={styles.section}>
               <Text style={styles.bold}>
                  PARA Empresa: {sale.client.name} (RECIBE {sale.client.name})
               </Text>
               <Text>Dirección: {sale.client.name}</Text>
               <Text>Localidad: {sale.client.name}</Text>
               <Text>
                  Provincia: {sale.client.name} CP: {sale.client.name}
               </Text>
               <Text>Teléfono: {sale.client.name}</Text>
            </View>

            {/* Datos del presupuesto */}
            <View style={styles.section}>
               <Text>N° de presupuesto: {sale._id}</Text>
               <Text>Fecha de entrega: {formatDate(sale.createdAt)}</Text>
            </View>

            {/* Tabla auxiliar */}
            <View style={styles.tableRow}>
               <Text style={[styles.tableCell, { flex: 1 }]}>ENCARGADO</Text>
               <Text style={[styles.tableCell, { flex: 1 }]}>TRABAJO</Text>
               <Text style={[styles.tableCell, { flex: 1 }]}>
                  CONDICIONES DE PAGO
               </Text>
               <Text style={[styles.tableCell, { flex: 1 }]}>
                  FECHA DE VENCIMIENTO
               </Text>
            </View>
            <View
               style={[
                  styles.tableRow,
                  { borderWidth: 1, marginBottom: 10, height: 15 },
               ]}
            >
               <Text style={[styles.tableCell, { flex: 1 }]}></Text>
               <Text style={[styles.tableCell, { flex: 1 }]}></Text>
               <Text style={[styles.tableCell, { flex: 1 }]}></Text>
               <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            </View>

            {/* Tabla de productos */}
            <View style={styles.tableHeader}>
               <Text style={[styles.tableCell, { flex: 0.5 }]}>CANT.</Text>
               <Text style={[styles.tableCell, { flex: 2 }]}>DESCRIPCIÓN</Text>
               <Text style={[styles.tableCell, { flex: 1 }]}>
                  PRECIO POR UNIDAD
               </Text>
               <Text style={[styles.tableCell, { flex: 1 }]}>TOTAL</Text>
            </View>

            {sale.products.map((prod, i) => (
               <View style={styles.tableRow} key={i}>
                  <Text style={[styles.tableCell, { flex: 0.5 }]}>
                     {prod.quantity}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 2 }]}>
                     {prod.product}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                     {formatCurrency(prod.unitPrice)}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                     {formatCurrency(prod.quantity * prod.unitPrice)}
                  </Text>
               </View>
            ))}

            {/* Totales */}
            <View style={styles.totalSection}>
               <View style={styles.totalRow}>
                  <Text>SUBTOTAL</Text>
                  <Text>{formatCurrency(sale.subtotal)}</Text>
               </View>
               <View style={styles.totalRow}>
                  <Text>IVA 21%</Text>
                  <Text>
                     {sale.iva ? formatCurrency(sale.subtotal * 1.21) : ""}
                  </Text>
               </View>
               <View style={[styles.totalRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.bold}>TOTAL</Text>
                  <Text style={styles.bold}>{formatCurrency(sale.total)}</Text>
               </View>
            </View>

            <View style={{ marginTop: 30 }}>
               <Text style={{ fontSize: 9 }}>
                  Este es un presupuesto de los artículos indicados, sujeto a
                  las condiciones que se indican a continuación:
               </Text>
               <Text style={{ fontSize: 9, marginTop: 5 }}>
                  Conformidad del presupuesto, firma y sello del cliente
               </Text>
               <Text
                  style={{ fontSize: 10, textAlign: "center", marginTop: 20 }}
               >
                  ¡Gracias por elegirnos!
               </Text>
            </View>
         </Page>
      </Document>
   );
}
