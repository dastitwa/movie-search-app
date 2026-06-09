# Movie Catalog Search using Elasticsearch

## Objective

The goal of this project is to gain hands-on experience with Elasticsearch fundamentals by building a movie search application using TypeScript.

The application will index a movie dataset into Elasticsearch and expose search APIs that demonstrate different search capabilities, relevance ranking concepts, and search analytics.

The implementation should cover:

* Elasticsearch installation and setup
* Index creation and mappings
* Data indexing
* Analyzed vs non-analyzed fields
* Full-text search
* Keyword search
* Partial text search
* Relevance scoring
* Field boosting
* Search ranking optimization

All design decisions should be documented, including the reasoning behind field types, analyzers, mappings, and boosting strategies.

---

# Tech Stack

* TypeScript
* Node.js
* Elasticsearch
* NestJS (Optional)
* Docker (Preferred)

---

# Dataset Requirements

Each movie document should contain the following fields:

```typescript
{
  id: string;
  title: string;
  description: string;
  genre: string[];
  cast: string[];
  director: string;
  releaseYear: number;
  language: string;
  rating: number;
}
```

### Dataset Constraints

* Minimum 100 movie records
* Dataset may be sourced from Kaggle or other public sources

---

# Project Phases

---

# Phase 1 - Elasticsearch Setup

## Tasks

* Install Elasticsearch locally
* Verify cluster health
* Create a dedicated index

## Deliverables

* Setup documentation
* Cluster health screenshots
* Index creation script

---

# Phase 2 - Mapping Design

Design an Elasticsearch mapping and justify every field type.

## Suggested Mapping

| Field       | Type           | Purpose              |
| ----------- | -------------- | -------------------- |
| title       | text + keyword | Search + exact match |
| description | text           | Full-text search     |
| genre       | keyword        | Filtering            |
| director    | text + keyword | Search + exact match |
| releaseYear | integer        | Numeric filtering    |
| rating      | float          | Sorting and boosting |

## Deliverables

* Mapping JSON
* Field type documentation
* Mapping design explanation

---

# Phase 3 - Data Indexing

Create TypeScript scripts to:

* Read movie dataset
* Transform data if required
* Bulk index documents into Elasticsearch

## Deliverables

* Bulk indexing script
* Indexed document count verification

---

# Phase 4 - Search APIs

## 1. Full Text Search

Example:

```text
dark knight
```

Search against:

* title
* description

Using:

```json
multi_match
```

---

## 2. Keyword Search

Example:

```text
Christopher Nolan
```

Search exact matches against:

* director

---

## 3. Partial Search

Examples:

```text
bat
dark
inter
```

Research and implement:

* edge n-grams
* search_as_you_type
* completion suggester

Document:

* Advantages
* Disadvantages
* Best use cases

---

## 4. Filtered Search

Examples:

```text
Genre = Action
Language = English
Year > 2010
```

Use:

```json
filter
```

clauses.

---

## 5. Combined Search

Example:

```text
action movies by Nolan after 2010
```

Combine:

* Search query
* Filters

into a single Elasticsearch request.

---

# Phase 5 - Ranking & Relevance

---

## Default Ranking (BM25)

Demonstrate Elasticsearch's default ranking behavior.

Explain:

* What BM25 is
* How BM25 works
* Why certain results rank higher

---

## Field Boosting

Example:

```json
{
  "title": "^5",
  "description": "^1"
}
```

A title match should rank higher than a description match.

Explain:

* What boosting is
* When boosting should be used
* Effect on ranking

---

## Rating Boosting

Higher rated movies should rank higher when textual relevance is similar.

Example:

```text
Rating 9.5 > Rating 6.5
```

Implement using:

* function_score
* field_value_factor

---

## Recency Boosting

Newer movies should receive additional relevance.

Example:

```text
2024 movies > 2005 movies
```

when textual relevance is similar.

---

# Phase 6 - Search Analytics

Implement aggregation APIs.

---

## Top Genres

Use:

```json
terms aggregation
```

---

## Movies Per Year

Use:

```json
histogram aggregation
```

---

## Average Rating By Genre

Use:

```json
avg aggregation
```

---

# Learning Deliverables

Prepare documentation covering the following Elasticsearch concepts.

## Core Concepts

### Inverted Index

* What is an inverted index?
* Why is it used?

### Indexing Process

* What happens during indexing?

### Field Types

Difference between:

* text
* keyword

### Analysis Pipeline

* Analyzer
* Tokenization
* Stop Words
* Stemming

### Relevance

* BM25
* Relevance Scoring
* Boosting

### Aggregations

* Purpose
* Types
* Use Cases

### Boolean Queries

Difference between:

* must
* should
* filter

### Query Types

Difference between:

* term query
* match query
* multi_match query

---

# Acceptance Criteria

## Functional

* Elasticsearch runs locally
* Dataset indexed successfully
* Mapping designed and documented
* Full-text search works
* Exact keyword search works
* Partial search works
* Search + filtering works
* Relevance scoring demonstrated
* Title boosting implemented
* Rating boosting implemented
* At least 3 aggregations implemented
* APIs written in TypeScript

---

## Technical

* TypeScript codebase
* Official Elasticsearch client used
* Bulk indexing used instead of single inserts
* Error handling implemented
* README contains setup instructions
* Search examples documented

---

## Documentation

* Explain field selection decisions
* Explain ranking strategy
* Explain boosting strategy
* Compare results before and after boosting
* Include screenshots or API responses as proof

---

# Bonus Features

* Search suggestions / autocomplete
* Typo tolerance using fuzzy search
* Synonym support
* Docker Compose setup
* Simple frontend UI
* Kibana screenshots and query demonstrations

---

# Expected Outcome

By the end of the project, the application should be able to:

* Index movie documents efficiently
* Support multiple search strategies
* Provide ranked search results
* Demonstrate Elasticsearch relevance tuning
* Expose analytics through aggregations
* Serve as a complete end-to-end Elasticsearch learning project
