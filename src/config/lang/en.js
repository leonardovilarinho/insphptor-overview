export default {
    languages: {
        en: 'English',
        pt: 'Portuguese',
    },

    title: {
        project: 'My projects',
        _class: 'Class',
        search: 'Classes between {min} at {max} ({metric})',
        methods: 'Methods',
        attributes: 'Attributes',
        type: 'Type',
    },

    labels: {
        metric: 'Choose an metric',
        compare: 'Choose an result for comparation',
        current: 'Last generation',
        interval: 'Interval in chart',
        found: 'found',
        commits: 'Commits',
        inserts: 'Inserts',
        deletions: 'Deletions'
    },

    more: {
        search: 'Search by name of project',
        close: 'Close',
        project: 'Project',
        comparation: 'Comparation',
        history: 'History',
        git: 'Team'
    },

    chart: {
        tooltip: '<em>From {point.key} at {point.key}+{0}</em><br/>',
        incident: 'Incidenties',
    },

    metrics: {
        size: 'Size',
        complexity: 'Complexity Ciclomatic',
        efferent: 'Efferent Coupling',
        afferent: 'Afferent Coupling',
        cohesion: 'Lack of cohesion',
        all: 'All metrics',
        instability: 'Instability',
        bug: 'Bugs',
    },

    box: {
        median: 'Medin',
        max: 'Maximum',
        min: 'Minimum',
        upper: 'Upper',
        lower: 'Lower',
    },

    tool: {
        interval: {
            title: 'Define your interval',
            body: 'What is the interval between the points on the Y axis of the graph?'
        },
        last: {
            title: 'Your last result',
            body: 'By default, we always leave your last result marked here in this field.'
        },
        compare: {
            title: 'Compare your results',
            body: 'Select a result from the list so we can compare with the result on the right.'
        },
        metric: {
            title: 'Define your current metric',
            body: 'Select which metric you want to have details at this point.'
        },
        _class: {
            title: 'Class summary',
            body: 'See the summary of this class below, click on the item to see more details.'
        },
        weight: {
            title: 'How are we?',
            body: 'See how many weight your code currently has.'
        },
        select: {
            title: 'How\'s your team?',
            body: 'Select the generation to see the graph of your team.'
        }
    },

    m_details: {
        size: 'See the size of the code in tokens',
        complexity: 'Path deviation amount',
        efferent: 'Number of dependencies of class',
        afferent: 'Number of class dependents',
        cohesion: 'Number of parts in which the code can divide',
        all: 'Sum of all metrics',
        instability: 'Number of times the class has changed',
        bug: 'Number of bugs in the class identified by the commit',
    },
}
