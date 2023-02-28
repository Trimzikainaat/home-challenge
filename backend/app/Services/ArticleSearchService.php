<?php

namespace App\Services;
use App\Services\Sources\GuardianSearchService;
use App\Services\Sources\NewsApiSearchService;
use App\Services\Sources\NytimesSearchService;

class ArticleSearchService
{
    private $nytimesService;
    private $newsApiService;
    private $guardianService;

    public function __construct(
        NytimesSearchService $nytimesService,
        NewsApiSearchService $newsApiService,
        GuardianSearchService $guardianService
    ) {
        $this->nytimesService = $nytimesService;
        $this->newsApiService = $newsApiService;
        $this->guardianService = $guardianService;
    }    

    public function searchFromSource($source, $keyword, $categories, $from, $language, $limit, $page)
    {
        switch ($source) {
            case 'nytimes':
                $results = $this->nytimesService->search($keyword, $categories, $from, $language, $limit, $page);
                break;
            case 'newsapi':
                $results = $this->newsApiService->search($keyword, $categories, $from, $language, $limit, $page);
                break;
            case 'guardian':
                $results = $this->guardianService->search($keyword, $categories, $from, $language, $limit, $page);
                break;
            default:
                $results = [];
                break;
        }        

        return $results;
    }
}
