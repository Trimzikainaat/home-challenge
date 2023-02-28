<?php
namespace App\Services\Sources;

use GuzzleHttp\Client;

class GuardianSearchService
{
    public function search($keyword, $categories, $from, $language, $limit, $page)
    {
        $client = new Client();
        $url = 'https://content.guardianapis.com/search';
        $params = [
            'api-key' => env('GUARDIAN_API_KEY'),
            'q' => $keyword,
            'lang' => $language,
            'show-fields' => 'thumbnail,trailText',
            'section' => $categories,
            'page-size' => $limit,
            'page' => $page
        ];

        if ($from) {
            $params['from-date'] = $from;
        }

        $response = $client->request('GET', $url, ['query' => $params]);
        $data = json_decode($response->getBody(), true);
        $articles = $data['response']['results'];

        $results = [];

        foreach ($articles as $article) {
            $result = [
                'source' => 'guardian',
                'title' => $article['webTitle'],
                'description' => $article['fields']['trailText'],
                'url' => $article['webUrl'],
                'image' => $this->getImage($article),
                'published_at' => $article['webPublicationDate'],
                'content' => $this->getContent($article)
            ];

            $results[] = $result;
        }

        return $results;
    }

    private function getImage($article)
    {
        if (isset($article['fields']['thumbnail'])) {
            return $article['fields']['thumbnail'];
        } else {
            return null;
        }
    }

    private function getContent($article)
    {
        return null;
    }
}
