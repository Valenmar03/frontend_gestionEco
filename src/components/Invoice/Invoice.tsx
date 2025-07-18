// components/InvoicePDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "../../helpers";
import { Sale } from "../../types"; // Ajustá si usás otro tipo

const styles = StyleSheet.create({
   page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Helvetica",
   },
   header: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 20,
   },
   section: {
      marginBottom: 10,
   },
   bold: {
      fontWeight: "bold",
   },
   table: {
      width: "100%",
      marginVertical: 10,
   },
   row: {
      flexDirection: "row",
   },
   cell: {
      flex: 1,
      padding: 5,
      borderWidth: 1,
      borderColor: "#000",
   },
});

export default function InvoicePDF({ sale }: { sale: Sale }) {
   return (
      <Document>
         <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Factura</Text>

            <View style={styles.section}>
               <Text>ID: {sale._id}</Text>
               <Text>Cliente: {sale.client.name}</Text>
               <Text>Fecha: {formatDate(sale.createdAt)}</Text>
            </View>

            <View style={styles.table}>
               <View style={styles.row}>
                  <Text style={styles.cell}>Producto</Text>
                  <Text style={styles.cell}>Cantidad</Text>
                  <Text style={styles.cell}>Precio Unitario</Text>
                  <Text style={styles.cell}>Total</Text>
               </View>
               {sale.products.map((prod, i) => (
                  <View style={styles.row} key={i}>
                     <Text style={styles.cell}>{prod.product}</Text>
                     <Text style={styles.cell}>{prod.quantity}</Text>
                     <Text style={styles.cell}>
                        {formatCurrency(prod.unitPrice)}
                     </Text>
                     <Text style={styles.cell}>
                        {formatCurrency(prod.quantity * prod.unitPrice)}
                     </Text>
                  </View>
               ))}
            </View>

            <View style={styles.section}>
               <Text>Subtotal: {formatCurrency(sale.subtotal)}</Text>
               <Text>Descuento: {formatCurrency(sale.discount)}</Text>
               <Text>IVA: {sale.iva ? "Incluido" : "No incluido"}</Text>
               <Text>
                  Tipo de precio:{" "}
                  {sale.type === "wholesalePrice"
                     ? "Mayorista"
                     : sale.type === "retailPrice"
                     ? "Minorista"
                     : "Mercado Libre"}
               </Text>
               <Text style={{ fontSize: 14, marginTop: 10 }}>
                  Total: {formatCurrency(sale.total)}
               </Text>
            </View>
         </Page>
      </Document>
   );
}
