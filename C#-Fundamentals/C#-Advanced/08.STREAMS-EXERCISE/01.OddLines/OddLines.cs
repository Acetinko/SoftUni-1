﻿using System;
using System.IO;

class OddLines
{
    static void Main()
    {
        StreamReader reader = new StreamReader("../../../text.txt");

        using (reader)
        {
            string line;
            int lineNumber = 0;

            while ((line = reader.ReadLine()) != null)
            {
                if (lineNumber % 2 != 0)
                {
                    Console.WriteLine(line);
                }
                lineNumber++;
            }
        }
    }
}