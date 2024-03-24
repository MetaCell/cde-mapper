export const getQueryByName = (queryString) => {
    if (queryString) {
        return {
            "size": 20,
            "from": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "query_string": {
                                "fields": [
                                    "label"
                                ],
                                "query": `${queryString}~`,
                                "type": "cross_fields",
                                "default_operator": "and",
                                "lenient": "true",
                                "fuzziness": 2,
                                "fuzzy_max_expansions": 50,
                                "fuzzy_prefix_length": 0,
                                "fuzzy_transpositions": "true"
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "label": {
                                    "query": `"${queryString}"`,
                                    "boost": 20
                                }
                            }
                        },
                        {
                            "term": {
                                "label.aggregate": {
                                    "term": `${queryString}`,
                                    "boost": 2000
                                }
                            }
                        }
                    ],
                    "filter": [
                        {
                            "terms": {
                                "type.aggregate": [
                                    "cde"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggregations": {}
        }
    }

    return {
        "size": 20,
        "from": 0,
        "query": {
            "bool": {
                "filter": [
                    {
                        "terms": {
                            "type.aggregate": [
                                "cde"
                            ]
                        }
                    }
                ]
            }
        }
    }
};


export const getQueryById = (id) => {
    if (id) {
        return {
            "size": 1,
            "from": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "query_string": {
                                "fields": [
                                    "ilx"
                                ],
                                "query": `${id}`
                            }
                        }
                    ],

                    "filter": [
                        {
                            "terms": {
                                "type.aggregate": [
                                    "cde"
                                ]
                            }
                        }
                    ]
                }
            },
            "aggregations": {}
        }
    }
};

export const getRelatedQuery = (id) => {
    if (id) {
        return {
            "size": 20,
            "from": 0,
            "query": {
                "bool": {
                    "must": [
                        {
                            "term": {
                                "superclasses.ilx": {
                                    "value": `${id}`
                                }
                            }
                        },
                        {
                            "term": {
                                "type.aggregate": {
                                    "value": "cde"
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
};

