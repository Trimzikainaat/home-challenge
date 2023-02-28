<?php

namespace App\Http\Controllers;
use App\Http\Requests\ArticleSearchRequest;
use App\Services\ArticleSearchService;
use App\Services\Sources\GuardianSearchService;
use App\Services\Sources\NewsApiSearchService;
use App\Services\Sources\NytimesSearchService;
use App\Http\Controllers\UserPreferenceController;


class ArticleController extends Controller
{

    private $articleSearchService;

    public function __construct(
        NytimesSearchService $nytimesService,
        NewsApiSearchService $newsApiService,
        GuardianSearchService $guardianService
    ) {
        $this->articleSearchService = new ArticleSearchService($nytimesService, $newsApiService, $guardianService);
    }
    
    public function search(ArticleSearchRequest $request)
    {
        // Get search parameters from the request
        $keyword = $request->input('keywords');
        $categories = $request->input('categories');
        $sources = $request->input('sources');
        $from = $request->input('from');
        $language = $request->input('language', 'en');
        $limit = $request->input('limit') ?? 10; // Default to 10 results per page
        $page = $request->input('page') ?? 1; // Default to first page

        $user = new UserPreferenceController();
        $user->saveUserPrefrences($request);


        if ($sources) $sources = explode(",", $sources);
        // Set default values for missing parameters
        $from = $from ?? date('Y-m-d');

        $sources = $sources ?? ['nytimes', 'newsapi', 'guardian']; // All sources
        // Search articles from each source and add to a single array
        $results = [];

        foreach ($sources as $source) {
            $results = $this->articleSearchService->searchFromSource($source, $keyword, $categories, $from, $language, $limit, $page);
        }

        // Sort the search results by published date (if available)
        usort($results, function ($a, $b) {
            return strcmp($b['published_at'], $a['published_at']);
        });

        // Paginate the search results
        $total = count($results);

        // Return the search results with pagination metadata
        return response()->json([
            'data' => $results,
            'page' => $page,
            'limit' => $limit,
            'total' => $total
        ]);
    }
    
}
