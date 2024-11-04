Requisitos Funcionais(RF)

-   [ x ] As empresas podem postar um produto para ser transportado por terceiros;
-   [x  ] Os entregadores podem visualizar e solicitar os fretes postados para realizarem as entregas;
-   [ x ] CRUD de Veículo, Fretes e Usuário...
    -    Insira regras mínimas como não deixar cadastro o mesmo Veículo, Usuário e outras que achar importante.
-   [  ] Alteração do atributo (Peso do cálculo) pode ser realizado porém deverá ser alterada os valores dos fretes apenas que não estão em andamento;
-   [ x ] Implementar autenticação;
-   [ x ] Perfis de usuários, com acessos equivalentes;
-   [ x ] Validações básicas;
    -    Ex. Ao cadastrar veículo verificar se ele já está cadastrado e etc.
-   [ x ] Testes. (somente uma funcionalidade)
        o Unidade (obrigatório)
        o Integração (opcional)
        o Ponta a ponta (opcional)

-------------------------------------------------------

Regras de Negócios(RN)

-   [ x ] O Frete sofre alterações de acordo com o tipo de veículo e distância.
-   [ x ] Valor do Frete
    -    km x (Peso do cálculo) Tipo de Veículo.
-   [ x ] Também é aplicado uma taxa em cima da quantidade de KM do frete.
        o 0 a 100km, 20%
        o 100 a 200km, 15%
        o 200 a 500km, 10%
        o 500+ , 7,5%
-   [ x ] O valor que o entregador vai receber é o valor do frete menos a taxa.

-------------------------------------------------------

Requisitos Complementares (opcional)

-   [ x ] Usuário com perfil entregador com acesso limitado a:
        o Visualização de fretes disponíveis.
        o Solicitar frete específico disponível.
        o Cancelamento de frete.
        o Histórico de fretes.
-   [ x ] Deve ser gerado um relatório todo dia as 8:00h
        o De todas as entregas concluídas no dia anterior.
-   [ x ] Baixar relatório (obrigatório)

-------------------------------------------------------

Requisitos Bônus 

-   [ x ] Criar Status do frete.
        o Onde é possível que o entregador mude o status do frete.
            ▪ Ex.”Aceito”,“ Rota de entrega”, “Finalizado”.