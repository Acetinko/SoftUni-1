﻿using System;
using System.IO;

class LineNumbers
{
    static void Main()
    {
        StreamReader reader = new StreamReader("../../../text.txt");

        using (reader)
        {
            StreamWriter writer = new StreamWriter("../../../output.txt");

            string line;
            int lineNumber = 0;

            while ((line = reader.ReadLine()) != null)
            {
                ++lineNumber;
                writer.Write($"Line{lineNumber}: {line}");
            }
            writer.WriteLine();
        }
    }
}