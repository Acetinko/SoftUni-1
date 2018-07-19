using System;
using System.IO;

class CopyBinaryFile
{
    static void Main()
    {
        string dirPath = "../../../";

        using (FileStream source = new FileStream($"{dirPath}copyMe.png", FileMode.Open))
        {
            using (FileStream destination = new FileStream($"{dirPath}img.png", FileMode.Create))
            {
                byte[] buffer = new byte[4096];

                int readBytes;

                while ((readBytes = source.Read(buffer, 0, buffer.Length)) != 0)
                {
                    if (readBytes == 0)
                    {
                        break;
                    }

                    destination.Write(buffer, 0, readBytes);
                }
            }
        }
    }
}