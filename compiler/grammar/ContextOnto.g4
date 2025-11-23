grammar ContextOnto;

options {
    language = Python3;
}

/*
 * --------------------------------------------------------------------
 *  PROGRAM
 * --------------------------------------------------------------------
 *  Um programa de ontologias contextualizadas é formado por um
 *  conjunto de CONTEXTOS. Cada contexto representa um domínio
 *  interpretativo, ou "ponto de vista", no qual uma ontologia pode
 *  ser definida e propriedades podem ser interpretadas.
 *
 *  Em termos algébricos:
 *     - cada contexto corresponde a um objeto especial,
 *       que serve como alvo para morfismos de contextualização.
 */
program
    : contextDecl* EOF
    ;

/*
 * --------------------------------------------------------------------
 *  CONTEXT DECLARATION
 * --------------------------------------------------------------------
 *  Define um contexto nomeado, que funciona como um "domínio
 *  contextual". Dentro de um contexto podem existir:
 *
 *     - ontologias locais
 *     - morfismos internos
 *     - quaisquer construções relevantes da álgebra contextual
 *
 *  Contextos são as unidades estruturais de interpretação.
 */
contextDecl
    : 'context' ID '{' decl* '}'            # ContextDeclaration
    ;

/*
 * --------------------------------------------------------------------
 *  DECLARATIONS INSIDE A CONTEXT
 * --------------------------------------------------------------------
 *  Dentro de um contexto podemos declarar:
 *
 *    1. Ontologias — estruturas formais compostas por conceitos.
 *    2. Morfismos — funções que transportam conceitos entre ontologias.
 *    3. Pushouts — construções algébricas que integram contextos.
 *
 *  Cada uma dessas partes corresponde a um componente essencial da
 *  álgebra de ontologias contextualizadas.
 */
decl
    : ontologyDecl
    | morphismDecl
    | pushoutDecl
    ;

/*
 * --------------------------------------------------------------------
 *  ONTOLOGY DECLARATION
 * --------------------------------------------------------------------
 *  Uma ontologia é um conjunto formal de conceitos. 
 *
 *  Em termos de estrutura algébrica:
 *    - ontologias correspondem a objetos da categoria
 *    - conceitos são os elementos internos desses objetos
 *
 *  Cada ontologia pode ser usada como origem ou alvo de morfismos.
 */
ontologyDecl
    : 'ontology' ID '{' ID* '}'             # OntologyDeclaration
    ;

/*
 * --------------------------------------------------------------------
 *  MORPHISM DECLARATION
 * --------------------------------------------------------------------
 *  Um morfismo é uma função estrutural entre ontologias:
 *
 *        f : A -> B
 *
 *  Ele expressa uma "contextualização" ou "interpretação" de uma
 *  ontologia A dentro de outra ontologia B.
 *
 *  Os mapeamentos internos representam a imagem dos conceitos sob
 *  esse morfismo.
 */
morphismDecl
    : 'morphism' ID ':' ID '->' ID '{' mapStmt* '}'   # MorphismDeclaration
    ;

/*
 * --------------------------------------------------------------------
 *  MAP STATEMENT
 * --------------------------------------------------------------------
 *  Cada declaração de mapa representa a imagem de um conceito
 *  sob o morfismo:
 *
 *        a -> b
 *
 *  Interpretado como: "o conceito a é transportado para o conceito b".
 */
mapStmt
    : ID '->' ID                            # MapStatement
    ;

/*
 * --------------------------------------------------------------------
 *  PUSHOUT DECLARATION
 * --------------------------------------------------------------------
 *  O pushout é uma construção algébrica fundamental para integrar
 *  dois contextos por meio de um par de morfismos que compartilham
 *  uma mesma origem.
 *
 *  Intuitivamente:
 *
 *        Dado   f1 : X -> A
 *               f2 : X -> B
 *
 *        O pushout constrói o contexto C, junto com inclusões
 *        i1 : A -> C e i2 : B -> C,
 *
 *        que satisfazem a igualdade:
 *               i1 ∘ f1 = i2 ∘ f2
 *
 *  Em termos da linguagem:
 *
 *        pushout NovoContexto = IntegrateContexts(A, B)
 *
 *  Ou seja: cria automaticamente um novo contexto integrado.
 */
pushoutDecl
    : 'pushout' ID '=' 'IntegrateContexts'
        '(' ID ',' ID ')'                    # PushoutDeclaration
    ;

/*
 * --------------------------------------------------------------------
 *  IDENTIFIERS
 * --------------------------------------------------------------------
 *  Identificadores são usados para nomear:
 *
 *     - contextos
 *     - ontologias
 *     - conceitos
 *     - morfismos
 *     - pushouts
 *
 *  Não possuem significado semântico por si só.
 */
ID
    : [A-Za-z_][A-Za-z0-9_]*
    ;

/*
 * --------------------------------------------------------------------
 *  WHITESPACE AND COMMENTS
 * --------------------------------------------------------------------
 *  Espaços, quebras de linha e comentários são ignorados.
 */
WS
    : [ \t\r\n]+ -> skip
    ;

LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;

BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
    ;
