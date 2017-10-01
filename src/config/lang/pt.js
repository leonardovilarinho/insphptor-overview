export default {
    languages: {
        en: 'Inglês',
        pt: 'Português',
    },

    title: {
        project: 'Meus projetos',
        _class: 'Classe',
        search: 'Classes entre {min} e {max} ({metric})',
        methods: 'Métodos',
        attributes: 'Atributos',
        type: 'Tipo',
    },

    labels: {
        metric: 'Escolha uma métrica',
        compare: 'Escolha um resultado para comparar',
        current: 'Última geração',
        interval: 'Intervalo no gráfico',
        found: 'encontrados',
    },

    more: {
        search: 'Busca por nome do projeto',
        close: 'Fechar',
        project: 'Projeto',
        comparation: 'Comparação',
        history: 'História',
    },

    chart: {
        tooltip: '<em>De {point.key} até {point.key}+{0}</em><br/>',
        incident: 'Ocorrências',
    },

    metrics: {
        size: 'Tamanho do código',
        complexity: 'Complexidade Ciclomática',
        efferent: 'Acoplamento Eferente',
        afferent: 'Acoplamento Aferente',
        encapsulation: 'Encapsulamento',
        cohesion: 'Coesão',
        all: 'Todas métricas',
    },

    box: {
        median: 'Mediana',
        max: 'Máximo',
        min: 'Mínimo',
        upper: 'Acima',
        lower: 'Abaixo',
    },

    tool: {
        interval: {
            title: 'Defina seu intervalo',
            body: 'Qual o intervalo entre os pontos do eixo Y do gráfico?'
        },
        last: {
            title: 'Seu último resultado',
            body: 'Por padrão, deixamos sempre seu último resultado marcado aqui nesse campo.'
        },
        compare: {
            title: 'Compare seus resultados',
            body: 'Qual o resultado que você quer comparar agora?'
        },
        metric: {
            title: 'Defina sua métrica atual',
            body: 'Qual métrica você quer ter detalhes nesse momento?'
        },
        _class: {
            title: 'Resumo da classe',
            body: 'Veja o resumo dessa classe a seguir, clique no item para ver mais detalhes.'
        },
        star: {
            title: 'Como nós estamos?',
            body: 'Veja a quantidade de estrelas que seu código tem atualmente.'
        }
    },

    m_details: {
        size: 'Veja o tamanho do código em tokens',
        complexity: 'Quantidade de desvio de caminho',
        efferent: 'Número de dependências da classe',
        afferent: 'Números de dependentes da classe',
        encapsulation: 'Relação entre tamanho de métodos públicos e privados',
        cohesion: 'Quantidade de partes em que o código pode se dividir',
        all: 'Somatória de todas as métricas',
    },
}
