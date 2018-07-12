using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Linq;

class WordCount
{
    static void Main()
    {
        Dictionary<string, int> wordsCount = new Dictionary<string, int>();
        string dirPath = "../../../";

        using (StreamReader readerWord = new StreamReader($"{dirPath}words.txt"))
        {
            string line;

            while ((line = readerWord.ReadLine()) != null)
            {
                wordsCount.Add(line.ToLower(), 0);
            }

            using (StreamReader readerSentences = new StreamReader($"{dirPath}text.txt"))
            {
                line = String.Empty;

                while ((line = readerSentences.ReadLine()) != null)
                {
                    string pattern = @"\w+";
                    MatchCollection matches = Regex.Matches(line, pattern);

                    foreach (Match match in matches)
                    {
                        string word = match.Value.ToLower();
                        if (!wordsCount.ContainsKey(word))
                        {
                            continue;
                        }
                    
                        wordsCount[word]++;
                    }
                }
            }
        }

        using (StreamWriter writer = new StreamWriter($"{dirPath}results.txt"))
        {        
            wordsCount
                .OrderByDescending(kvp => kvp.Value)
                .ToList()
                .ForEach(kvp => writer.WriteLine($"{kvp.Key} - {kvp.Value}"));
        }
    }
}