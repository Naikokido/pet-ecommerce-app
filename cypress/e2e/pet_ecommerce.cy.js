
describe('Pet App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3001')
    })

    it('frontpage can be opened', () => {
        cy.contains('Bienvenido a Pet Ecommerce')
        cy.contains('Gatos')
        cy.contains('Perros')
        cy.contains('Otros')
    })

    it('Lista de productos', () => {
        cy.contains('Ver productos').click()
        cy.contains('Comida Húmeda para Gato - Atún')
        cy.contains('Snacks de Pollo para Perro')
    })

    it('Añadir producto a carrito', () => {
        cy.contains('Ver productos').click()
        cy.get('button').first().click()
        cy.get('button').eq(1).click()
        cy.get('ul').contains('Comida Húmeda para Gato - Atún')
        cy.get('ul').contains('Snacks de Pollo para Perro')
    })

    it('Canjear cupón', () => {
        //anadir productos a carrito
        cy.contains('Ver productos').click()
        cy.get('button').first().click()
        cy.get('button').eq(1).click()
        cy.get('ul').contains('Comida Húmeda para Gato - Atún')
        cy.get('ul').contains('Snacks de Pollo para Perro')

        //canjear cupon
        cy.get('[placeholder="Ingresa un cupón"]').first().type('Susu')
        cy.get('[value="Canjear"]').first().click()

        //comprobar cupon
        cy.contains('Descuento:')
        cy.contains('Cupón válido')
    })

    //ADMIN

    it('Abrir panel admin', () => {
        cy.contains('Panel Admin').click()
        cy.contains('En esta seccion apareceran las ventas, utilza el calendario para filtrar por fecha')
    })
    
    it('Anadir nuevo producto', () => {

        //entrar a crear productos
        cy.contains('Panel Admin').click()
        cy.contains('Productos').click()
        cy.contains('Administrar Productos')
        cy.contains('Nuevo Producto').click()

        //crear producto
        cy.get('[placeholder="Nombre Producto"]').first().type('Juguete de mascota123')
        cy.get('[placeholder="Precio Producto"]').first().type('5')
        cy.get('[placeholder="Cantidad Disponible"]').first().type('10')
        cy.get('[id="categoryId"]').first().select('Juguetes')
        
        cy.contains('Agregar Producto').click()
    })
   
    it('Comprobar Producto Nuevo', () => {

        //entrar a productos
        cy.contains('Panel Admin').click()
        cy.contains('Productos').click()
        cy.contains('Administrar Productos')

        //crear producto
        //cy.contains('Juguete de mascota123')
        cy.contains('Juguete de mascota')
    })

})