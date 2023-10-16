

### Solucionar
* Campo date
```
{ new Intl.DateTimeFormat('pt-BR').format( new Date(transaction.createdAt) )}
```