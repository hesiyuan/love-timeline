/* game.bundle.js — BUILT ARTIFACT (do not edit). Run `node build.js` after editing src/ modules. v1.4.1 */

/* ==== sprites.js ==== */
const SPRITES={"husband": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAyUlEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOyBMid1zpCMDRoVayBe5gFWbFqzxkGf6x2rEF1EkwxCHCcfoehXDd8FzxC4X44mCoIxthAW+QbOBslpsEm3Cxj4LqJJthQBmeixLS+gQHDxQsXUNTCxDBj+ZwoGCMnPhD7xzQnMIaJg3Whp1CYadjEAQU0bQHYt5+NAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA1ElEQVR4nGNkQAOSfHz/0cWef/rECGOzoCvWNXFAV8/AcObAf5gmRmTFrHwiDLjA709vUGwCa/h/ZQUYY2NLQp3KxEAiYMIm+OzYLKxsDA0fDu1C5mIVZ0SWALnzWkcIhgatijVwD7MgK1btOcPgj9WONahOgikGAY7T7zCU64bvgkco3A8HUwXBGBtoi3wDZ6PENNiEm2UMXDfRBBvK4EyUmNY3MGC4eOECilqYGMzTWOMBJImSDNABOPrPiYIxcmoFsX9McwJjmDjYFPQkDTMdmzgA8vVymyLmCAMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAxklEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOMAXPjtY4QDA1aFWvgHmaEKVbtOcPAcfodww9TIQwNHKffMVxe6QbWBHfSwVRBhp2zlMGS6KAt8g2cTXIoofhB38AAq6KLFy7A/YCSNGCSyACrIeDYPCcKxsiJD8T+Mc0JjGHi8FBCNgBmPTZxAAHbbUS7vx23AAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA1klEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96A7YJxYaHO9pwapCySsN0ErLEs2OzUPgwgOIkmCJsQMoqDewkJmTBD4d2YVX8AUkcJVhBtlzrCMHQoFWxBh60LMiKVXvOMPhjtWMNnMWErBgEOE6/w1CuG74LHqFwPxxMFQRjbKAt8g2cjRGsTDfLGLhuogk2lMGZKMGqb2DAcPHCBRS1MDHk9ARW/P+cKBgjJz4Q+8c0JzCGiYN1oadQmGnYxAGFfV/b2LcSYgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA0ElEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStIzg4AzfxfDDVAirDbdLTMA0TBPYSTDFB1MFwRgZbN6wDIxhrgBr4Dj9DoyJAXA/6BsYYFVw8cIFFCfBAUiTh53dfxANwj+mOYExevqC6wJJPDvADmZLOfxEMQwjLcE04FKEDACL1FspE6pt7wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA2UlEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA0CmZ1gWopfGexxFphi1Z4zDP5YbDiIxoc7ieP0O6xOck+7CzcdrgHEubzSDUMTiA8SR4k45OSgb2CA1ZaLFy7A2WA/3O8wYQhY8QdDEmbIswPsEI87/IR4+Mc0p/8gGj3xgfj/z4nC5eGC2FIpsiZkeQCfZmBgFTm9hgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAyElEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA1aFWtQgpYFpli15wyDP1Y71mB3EsfpdxhKD6YKMjz7eBclQsEaQFZeXumGohibARh+0DcwwFBw8cIFTD/AwIYICFex4gyYxmYAig3oks8OsINpKYefcFtQUiIyQDcApgEAwlNOZTRbAlIAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAzElEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStIzg4AzfxfDDVAirDbdLTMA0TBPYSTDFB1MFwRgZbN6wDIxhrgBr4Dj9DoyJAXA/6BsYYFVw8cIFFCfBAUgTCP8/JwrGHnZ2YD56+sKZ+O53QDyrWHEGNZSwOQPdVGQNAFe0W00Pm5tQAAAAAElFTkSuQmCC"], "wife": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA7ElEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8Igz4wO9Pb+A2sqBreLijDasmeY8qBkkGBrCNTMgSD6EapKzS4GLIbBhA0UQswKrp2bFZWNlYNX04tIsBGx9dHCX0fn96w3CtIwTDZK2KNQwweVBAwMNeko/v/0qDM1j9EH7BBCWCmdA1PH5wHENTj8BklNQC95PtQUEwxgbUFwij8OHJCAYWK8xlYGAAYQRoYShD4aP4Sd/AgOHihQsoCmBi6IkWrOH/OVEwRnY7iP1jmhMYI4vDgxzZEJipuMQBR6xt0kmTITYAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA8ElEQVR4nGNkgAJJPr7/uiYODNjA5TMHGJ5/+sQI47Oga9g5KQpDk3seAwPDmQP/YRoZQRpY+UTAkg93tDHgAvIeVQy/P70B28iETYGUVRpWNgxg1UQIYNX07NgsrGysmj4c2sWAjY8uDg4NSWhggDx6rSMEw2StijUMMHlQQMDDXpKP7/9KgzNY/RB+wQQlnpjQNTx+cBxDU4/AZLAaDD/ZHhQEY2xAfYEwCh+cIhiQwGKFuQwMDCCMAC0MZSh8FD/pGxgwXLxwAUUBTAzDT+gApABZEVYAsuX/OVEwRvYwiP1jmhMYI4vD4wndJnziAKVVcWRDp8XpAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA3UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRiwACmrNKxsGMCqiRDAqunZsVlY2Vg1fTi0iwEbH10cJfR+f3rDcK0jBMNkrYo14ICAhSBc00qDMwyPHxxnkFWwxNAEEi/5kIsIcpiE7UFBhqiHXmAF6EB9gTDhgGAgAOBJA+REfQMDrIouXriAkv7gaQ9ZATLAZRDYlv/nRMEYOaWD2D+mOYExsjg89JANgTkFlzgA4whrqdl4LeAAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA7klEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRjIACzoAlJWaWD62bFZKHyYa7BqegZVjM4H+QsGUJz34dAurM5BF0cJvd+f3jBc6wjB0KRVsQbsPFgIwsNeko/v/0qDM1htCr9gghLBTOgaHj84jqGpR2AySmqB+8n2oCAYYwPqC4RR+Biht1hhLgMDAwgjQAtDGQofxU/6BgYMFy9cQFEAE0NPtGAN/8+JgjGy20HsH9OcwBhZHB7kyIbATMUlDgDmj25M3NljAQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA5UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXhwc5CGhVrGG41sGAAUDisMBCCfIegckMsgqWmDoYGBjCL5iAaXiQwyRkoRpsDwqCMTLYvGEZGMOCHO68xw+OQ1leWG1DBvCkATJF38AAq6KLFy6gOA8FgDR62Nn9B9Eg/GOaExijJ2QUnSDJZwfYwWwph58oBmIkWGRNuBQiAwDNZVsXJcRdpAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA8UlEQVR4nGNgIAMwwhiSfHz/dU0csCq6fOYAw/NPn+BqWdA17JwUhaHJPY+BgeHMgf8wjYwgDax8ImDJhzvacDpJ3qOK4fenN2AbmXApkrJKw8oGAZya8AGcmp4dm4WVjaHpw6FdWA1AFweHhiQ0MEAevdYRgqFJILOTQV7WHB4QKPG00uAMVptsDwqCaSl+ZczQe/zgOFZNy+S3wTWg+On5p0+MJR9yMTSC+CBx5BQB9xNMQN/AAKttFy9cgLPByQgE7neYMASs+IOhAGbQswPsEH85/EQEwo9pTv9BNLKtMLn/50Th8igS6IrRNSLLAwAqZW/5sxUupwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA4UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXRwm935/eMFzrCMHQpFWxBhwQsBCEh70kH9//lQZnsNoUfsEEJYJRnPf4wXEMDbYHBRmefbyLklrgmp5/+sRY8iEXRQM2Q+B+QnaivoEBhqKLFy6gOA+e9mBgQwRESLEC4j9shmDYhK7g2QF2MC3l8BNuG4omdIBuCEwTAPolXr79kVHSAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA4UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXRwm935/eMFzrCMHQpFWxBhwQsBCEa+oRmMwgq2CJ1abwCyZgGh7kMAlZqAbbg4JgjAw2b1gGxrAgh6eIxw+OQ1leWG3D8BPMifoGBlgVXbxwAcV5KACkEYT/nxMFYw87OzAfPSFj6ERWcL8DEgCKFWdQbMG0DotmdKcBABK+ZBca1/txAAAAAElFTkSuQmCC"], "creamy": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAn0lEQVR4nGNgwAM83d3+4+Pj1AQCIBqGYXyCGn/9+vMfBkBsZE1M2DRZmpv/X7pyHZgtI68KphVVNFDUMGHThMy/f+cGmH7y8DaDwTspuDwjNsULl69nUJARw+oFe1trhuMnTzKCNcH88O7Dl/+37j0Ds2EYJAbDMjIyqAED0gzCME0whcgGgORAGEMzSABdAYyGySGLoWhCl0A2HV0MAKn9u5/qC7OkAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAlElEQVR4nGNgIAA83d3+4+Pj1AQCIBqGYXyCGn/9+vMfBkBsmCYmXJoszc3/L125DsyWkVcF04oqGnB5JmSFMBrGhoH7d26A6ScPbzMYvJOCqwUzQM6Aabp17xkYg8SwYbBGEAECIPrdhy9YNYDEYVhGRgbhGpjVIEFkhegaUTTBAEwTiAbZikyDxGHOx6kZF41uKAANk9ohEi3a5wAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAlElEQVR4nGNgoBXwdHf7j4+PUxMIgGgYhvEJavz1689/GACxYZqYQISlufl/EIZpgPGXrlwH5svIq4JpRRUNhKkgBTDTYBpu3XsGxu8+fAGLI9taaZoAVsMI0wyit+7cy/Dm3ScGBRkxvF6wt7VGFZCRkQGbDrIJ2TYYH4RBarCaBtMMwjA2zOk4NSFrhmkC0dg0AQDFzaonHn4sdAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAlUlEQVR4nGNgoBXwdHf7j4+PUxMIgGgYhvEJavz1689/GACxYZpYQISluTnchOMnTzLC+EtXrgOLycirMjx5eJtBUUWDQU9TCaIQpAhmGgiD+LfuPQPjdx++wMVhoNI0AayGEd3GhcvXMyjIiOH1gr2tNaqAjIwM2HSQTci2wfggDFKD1TSYZpgGmLNB4jg1YdOMSwMASveqenhsuVAAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAr0lEQVR4nGNgIAA83d3+4+Pj1AQCIBqGYXyCGn/9+vMfBkBsmCYmEGFpbo5hgqW5+f+lK9eB2TLyqmBaUUUDLs8EUnDsxAmwQpgB6Abdv3MDTD95eJvB4J0UQh7EADkDhEHsW/ee/X/34QtcDB2jGAziyMjIgDWhKwQZAsMgNXA/gsDxkycZQbSCjBjDl28/UDAPFwdYzZt3n3CHJMhEmE0wNswlMNvwaoQpQqdhAAASX71lV3zjMAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAnUlEQVR4nGNgwAM83d3+4+Pj1AQCIBqGYXyCGn/9+vMfBkBsZE1M2DRZmpv/X7pyHZgtI68KphVVNFDUMMEUgjCMjazg/p0bYPrJw9sMBu+kEPIgBswpMANu3XsG5mPDKAbDNLz78AVDE0gMhmVkZLAHDEgCWTG6bSBDYZoZkTXdu/eA4cGTV2C+k50ZVsOfPHkC14NiG4hGNhkXAACJhb3fFS0UwgAAAABJRU5ErkJggg=="]};
const OUTFIT_SPRITES={"husband_wedding": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA0UlEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOyBMid1zpCMDRoVaxhwBpKwnI6cEUnTx5gMDeHBPHbR1fgGpjQFX/48A7DBmY+KXiEwv1w+fJGMMYGNizqgbNRYhoEdJTEwHSwpwuDjBCGNKof9A0MGC5euICiACaGGcvnRMEYOfGB2D+mOYExTBysCz2FwkzDJg4ATWtyy8nS9R8AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA00lEQVR4nGNkQAOSfHz/0cWef/rECGOzoCvWNXFAV8/AcObAf5gmRmTFrHwiDLjA709vUGwCa/h/ZQUYY2NLQp3KxEAiYMIm+OzYLKxsDA0fDu1C5mIVZ0SWALnzWkcIhgatijUMWENJWE4Hqw1vH12Ba2BCV/zhwzswffLkAbgGZj4peITC/XD58kYwxgY2LOqBs1FiGgR0lMTgbBkhDGlUP+gbGDBcvHABRQFMDMUP6AAkiZIM0AE4+s+JgjFyagWxf0xzAmOYONgU9CQNMx2bOAAvcnbXI7LNGAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAz0lEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOMAXPjtY4QDA1aFWvgHmaEKRaW02H48OEdg4CAEFjRyZMHGMzNIUH84cM7hr+fnoE1wZ10+fJGhsePD4Ml0cGGRT1wNsmhhOIHfQMDrIouXrgA9wNK0oBJIgOshoBj85woGCMnPhD7xzQnMIaJw0MJ2QCY9djEAWq9dJcYqq8VAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA3klEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96A7YJxYaHO9pwapCySsN0ErLEs2OzUPgwgOIkmCJsQMoqDewkJmTBD4d2YVX8AUkcJVhBtlzrCMHQoFWxBh60KE4SltOBKzp58gCDuTkkiN8+ugLXwISu+MOHdxg2MPNJwSMU7ofLlzeCMTawYVEPnI0RrDpKYmA62NOFQUYIQxrVD/oGBgwXL1xAUQATQ05PYMX/z4mCMXLiA7F/THMCY5g4WBd6CoWZhk0cAM20ZaU5hE1EAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA20lEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStIwgxcx8UgwCAkIoCk+ePMBgbu7A8PbRFTAfpgnsJJjiy5c3gjEy2LxhGRjDXAEO1g8f3mF1PzYA94O+gQFWBRcvXEBxEhyANHnY2f0H0SD8Y5oTGKOnL7gukMSzA+xgtpTDTxTDMNISTAMuRcgAAHaJXapBCY6BAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA7ElEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA0CmZ1gWopfGexxeCgJy+mgKDx58gCDubkDw+XLG1E0IJz04R1WJ8nK2sIVg/jgYAVxJBkY/n8AOUFACOH+D+8Y/n56hhLbjMjJQd/AAKstFy9cgLPBNtzvMGEIWPEHQxJmyLMD7BB/OPyEePjHNKf/IBo98YH4/8+JwuXhgthSKbImZHkApBtnb3RH0rkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA0klEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA1aFWsYsIaSsJwOisKTJw8wmJs7MLx9dAVFA8JJH95hmH758kaGZx/vokQoWAPIhL+fnmH1AzpA8YO+gQGGgosXLqA4CR5xILAhAsJVrDgDprEZgGIDuuSzA+xgWsrhJ9wWlJSIDNANgGkAABy3VjXeWa7EAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA10lEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStIwgxcx8UgwCAkIoCk+ePMBgbu7A8PbRFTAfpgnsJJjiy5c3gjEy2LxhGRjDXAEO1g8f3mF1PzYA94O+gQFWBRcvXEBxEhyANIHw/3OiYOxhZwfmo6cvnInvfocJmFasOIMaSticgW4qsgYAQmldzj4ASwcAAAAASUVORK5CYII="], "wife_wedding": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABFklEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYgZ8IDM+lqFn+vRljs7euowgU1j5ROCSD3e0YdUk71HF8PvTG4aztx5dZkKWeAjVIGWVBhdDZsMAiiZiAVZNz47NwsrGqunDoV0M2Pjo4ozPXny4ZKwmpwsKDJBHr3WEYJisVbGGASYPCgiIE158uAQKxa9ff2HFIDmQGoSbX3yYhqzh3KUHGJpAYlCN00B6WGCaubg+4gytf2+uoPoJRIBN+XgXLOBpH4yhqaWhjME3IAqeBuEJEaRR38CA4eKFCygaYGIYiRak4f85UTBGTukg9o9pTmCMLA53HrIhMFNxiQMAwUHMQKLfZLsAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABHElEQVR4nGNgYGBgWLp06VJJPr7/+/YcxIpBciA1DFDACOKUZGZGLV23GSzgKPGcAR3sfyHJEB3ky9AzffoyR2dvXUaQKax8ImDJhzvaGHABeY8qht+f3jCcvfXoMhM2BVJWaVjZMIBVEyGAVdOzY7OwsrFq+nBoFwM2Pro447MXHy4Zq8npggID5NFrHSEYJmtVrGGAyYMCAuKEFx8ugULx69dfWDFIDqQG4eYXH6Yhazh36QGGJpAYVOM0kB4WmGYuro84Q+vfmyuofgIRkiBTPt4FC3jaB2NoamkoY/ANiGJ4/ukTWD2YgGnUNzBguHjhAooGmBhMAwhgjSeQAmRFWAHIlv/nRMEYxEYW/zHNCYyRxeF+QrcJnzgA0ZTOulbv8TkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABEUlEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYrCAv+p3DEM33uZkyIyPZeiZPn2Zo7O3LiPIFFY+EbDkwx1tDLiAvEcVw+9PbxjO3np0mQmbAimrNKxsGMCqiRDAqunZsVlY2Vg1fTi0iwEbH12c8dmLD5eM1eR0QYEB8ui1jhAMk7Uq1jDA5EEBwQDSJMnH9//r11//z116AKbRMUgcpAakFuw8KQkBPRCDi+sjg6EuN8PNu88wbPr35gqYBql99uLDNLJCjxHGAFmvb2CAVdHFCxdQ0h8LNgXIAJdBYFv+nxMFY+SUDmL/mOYExsjiYCvRswTMKbjEAWAcqfvwEY5sAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABGUlEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYrCAv+p3DEM33uZkyIyPZeiZPn2Zo7O3LiPIFFY+EbDkwx1tDLiAvEcVw+9PbxjO3np0mYmBDMCCLiBllQamnx2bhcKHuQarpmdQxeh8kPNgAMV5Hw7twuocdHEWkMeM1eR0QdZrVaxhuNaBqQkkjuw8iBNefLgECsWvX39hxSA5kBpkDdOQNZy79ABDE0gMqnEaSkBwcX3E6h8Q+PfmCgofnKbApny8CxbwtA/G0NTSUMbgGxAFT4PwhAjSqG9gwHDxwgUUDTAxjEQL0vD/nCgYI6d0EPvHNCcwRhaHOw/ZEJipuMQBEnPFwk8DwyYAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABD0lEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYrCAv+p3DEM33uZkyIyPZeiZPn2Zo7O3LiPIFFY+EbDkwx1tDLiAvEcVw+9PbxjO3np0mQmXIimrNKxsEMCpCR/AqenZsVlY2RiaPhzahdUAdHEWZI5WxRqGax2YmkDisMCCWP3iwyVQCJ679OD/16+/sGKQPAiD1IL0gGNako/v/53nb8CGcHF9BNPfvvHDDb5+EuI834AoUJBPh/vp5t1nYEwMgKcpkG36BgZYFV28cAFMY02DII0ednZwP/yY5gTG6AkZRSfYswfYwWwph58oBiLbgqEJl0JkAAD1VJxlEsl4FAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABD0lEQVR4nGNgwAL+//+/lIEQWLp06VJJPr7/+/YcxIpBciA1MPWMIE5JZmbU0nWbwQKOEs8xDN3/QpIhOsiXoWf69GWOzt66jCBTWPlEwJIPd7ThdI28RxXD709vGM7eenSZCZciKas0rGwQwKkJH8Cp6dmxWVjZGJo+HNqF1QB0ccZnLz5cMlaT0wUFBsij1zpCMDQJZHYyyMuawwMCYv2LD5dAofj16y+s+P//12AMUgNSC9IwDaQRJHDu0gOsmkDiIHmEJ6GaGHBoxNAA8hNMMUxA38AAa2BcvHABzmaBMe53mDAErPiDoQBm0LMD7GC2lMNPhLN+THMCOwPdKSD+/3OicHkUCXTF6BqR5QGiH9RzMtsRqAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABB0lEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYrCAv+p3DEM33uZkyIyPZeiZPn2Zo7O3LiPIFFY+EbDkwx1tDLiAvEcVw+9PbxjO3np0mQmXIimrNKxsEMCpCR/AqenZsVlY2RiaPhzahdUAdHEWkMeM1eR0QYGhVbGG4VoHpiaQOCywENa/+HAJFIpfv/7CikFyIDXIGqaBaJDEuUsPMDT8//8ajKEap6H46fmnT4zeNnooLrh59xlWP6KkKZBp+gYGGIouXriAkv5Y0BVsiIAIKVacAdPYDMGwCV3BswPsYFrK4SfcNswkj8cQmCYA04aqJ8bjeQgAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAABFUlEQVR4nGNkQAKSfHz/GbCA558+MWIILl26dClIw749B7FikBxIDUw9I4hTkpkZNX3hYrCAv+p3DEM33uZkyIyPZeiZPn2Zo7O3LiPIFFY+EbDkwx1tDLiAvEcVw+9PbxjO3np0mQmXIimrNKxsEMCpCR/AqenZsVlY2RiaPhzahdUAdHEWkMeM1eR0QYGhVbGG4VoHpiaQOCywIFa/+HAJFILnLj34//XrL6wYJA/CILUgPeCYluTj+3/n+RuwIVxcH8H0t2/8cIOvn4Q4zzcgChTk0+F+unn3GRgTA+BpCmSbvoEBVkUXL1wA01jTIMzt/8+JgrGHnR3cP1htQtYIY9/vMAHTihVnUGzBtA6LZnSnAQCVMKCwQNj52AAAAABJRU5ErkJggg=="], "husband_cozy": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAzElEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOyBMid1zpCMDRoVayBe5gFWfHqBBuGqzdeMOADTMiKQeDSkzcYimpdNOARCveD9cSFYIwNmOXUwdkoMQ0Cm95wMGx68wVFrCUAwUaJaX0DA4aLFy6gKIaJYcbyOVEwRk58IPaPaU5gDBMH60JPoTDTsIkDAF6ScF66YHBQAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA1klEQVR4nGNkQAOSfHz/0cWef/rECGOzoCvWNXFAV8/AcObAf5gmRmTFrHwiDLjA709vUGwCa/h/ZQUYY2NLQp3KxEAiYMIm+OzYLKxsDA0fDu1C5mIVZ0SWALnzWkcIhgatijVwD7MgK16dYMNw9cYLBnyACVkxCFx68gZDUa2LBjxC4X6wnrgQjLEBs5w6OBslpkFg0xsOhk1vvqCItQQg2CgxrW9gwHDxwgUUxTAxmKexxgNIEiUZoANw9J8TBWPk1Api/5jmBMYwcbAp6EkaZjo2cQDxL3X4Nj3ncwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAxklEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96g2ITWMP/KyvAGBtbEupUJgYSARM2wWfHZmFlY2j4cGgXMherOCOMAXPjtY4QDA1aFWvgHmaEKV6dYMNw6ckbBj0ZzJC69OQNQ/OeG2BNcCdZT1zIkLl2K1gSHZjl1MHZJIcSih/0DQywKrp44QLcDyhJAyaJDLAaAo7Nc6JgjJz4QOwf05zAGCYODyVkA2DWYxMHAA+nbwU+XxwJAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA2ElEQVR4nGNgIBEwogtI8vH9Rxd7/ukTXB0LumJdEwdMY88c+A/TxIismJVPBKdTfn96A7YJxYaHO9pwapCySsN0ErLEs2OzUPgwgOIkmCJsQMoqDewkJmTBD4d2YVX8AUkcJVhBtlzrCMHQoFWxBh60LMiKVyfYMFy98YIBH2BCVgwCl568wVBU66IBj1C4H6wnLgRjbMAspw7OxgjWTW84GDa9+YIi1hKAYKMEq76BAcPFCxdQFMPEkNMTWPH/c6JgjJz4QOwf05zAGCYO1oWeQmGmYRMHAN7bYzhOXMBPAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA2UlEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStCwgxbUuGgx6MiIMV2+8wGqLJB8fPGjBTgIpBgHriQvBGBls3rAMjGGuAAfrpSdvIBqwmo8K4H7QNzDAquDihQtgGj2JgDV52Nn9B9Eg/GOaExijpy+4LpDEswPsYLaUw08UwzDSEkwDLkXIAADKKlskkkzptAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA20lEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA0CmZ1gWopfGexxFpji1Qk2DFdvvMDQYI3Ghzvp0pM3WJ00PdgbbjpcA4jTvOcGhiYQHySOEnHIyUHfwACrLRcvXICzwX6432HCELDiD4YkzJBnB9ghHnf4CfHwj2lO/0E0euID8f+fE4XLwwWxpVJkTcjyAGS3ZOLPcgJNAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAyklEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicN9D/L4tY4QDA1aFWtQgpYFpnh1gg3D1RsvGAgBJhjj0pM3GJLWExcyPPt4FyVCwRpAVjbvuYGiGJsBGH7QNzDAUHDxwgVMP8DAhggIV7HiDJjGZgCKDeiSzw6wg2kph59wW1BSIjJANwCmAQDZeVIW5BsgGwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAA1UlEQVR4nGNgIBEwInMk+fj+oyt4/ukTihoWZMW6Jg6YRp458B9ZEyNMMSufCE5n/P70Bm4T3IaHO9rgCqSs0hieHZsFZyMDJgYSARM2QZjp6GwUDR8O7WLABj6gicM9DaKvdYRgaNCqWIMStCwgxbUuGgx6MiIMV2+8wGqLJB8fPGjBTgIpBgHriQvBGBls3rAMjGGuAAfrpSdvIBqwmo8K4H7QNzDAquDihQtgGj2JgDWB8P9zomDsYWcH5qOnL5yJ736HCZhWrDiDYjqqNVg0ojsHAJYKW0jFA43TAAAAAElFTkSuQmCC"], "wife_cozy": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA90lEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8Igz4wO9Pb+A2sqBreLijDasmeY8qBkkGBrCNTMgSD6EapKzS4GLIbBhA0UQswKrp2bFZWNlYNX04tIsBGx9dHCX0fn96w3CtIwTDZK2KNQwweVBAgOPp+adPjKCQiV84i6ETqy/WMDx6co8RxXmSfHxgDSBw7/YdDC22NWUoqQXup/YAZzDGBspMDFD48GQEA5+27GK4wIDq8ZCGMsyAgDlR38CA4eKFCygKYGLoiRas4f85UTBGdjuI/WOaExgji8ODHNkQmKm4xAF3kXKAU2swsQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA/klEQVR4nGNkgAJJPr7/uiYODNjA5TMHGJ5/+sQI47Oga9g5KQpDk3seAwPDmQP/YRoZQRpY+UTAkg93tDHgAvIeVQy/P70B28iETYGUVRpWNgxg1UQIYNX07NgsrGysmj4c2sWAjY8uDg4NSWhggDx6rSMEw2StijUMMHlQQICD/PmnT4ySDAz/4xfOYujE6os1DI+e3GNEcZ4kHx9YAwjcu30HQ4ttTRlYDYaf2gOcwRgbKDMxQOGDnceABD5t2cVwgQHV4yENZZgBAXOivoEBw8ULF1AUwMSQ0x7WeAIpQFaEFYBs+X9OFIyRPQxi/5jmBMbI4vB4QrcJnzgAzU92EuBMN94AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA3UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRiwACmrNKxsGMCqiRDAqunZsVlY2Vg1fTi0iwEbH10cJfR+f3rDcK0jBMNkrYo14ICAhSBcU/zCWQz3bt9hUFJVwdAEEj/c0oUIcphEe4Azw8rSdLACdFBmYkA4IBgIAHjSADlR3wDVRBi4eOECSvqDpz1kBcgAl0FgW/6fEwVj5JQOYv+Y5gTGyOLw0EM2BOYUXOIA/IJrv+k5cswAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA+klEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRjIACzoAlJWaWD62bFZKHyYa7BqegZVjM4H+QsGUJz34dAurM5BF0cJvd+f3jBc6wjB0KRVsQbsPFgIgp33/NMnRkkGhv/xC2cxdGK1aw3Doyf3GFGcJ8nHB9YAAvdu38HQYltThpJa4H5qD3AGY2ygzMQAhY8Rep+27GK4wIDq8ZCGMsyAgDlR38CA4eKFCygKYGLoiRas4f85UTBGdjuI/WOaExgji8ODHNkQmKm4xAEWg3L611FGlgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA60lEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXhwc5CGhVrGG41sGAAUDisMACARZQMEoyMPy3rSljUFJVYejE1MPAwLAGNchhwkqqKmC6PcAZjJHB5g3LwBgW5HDn3bt9B8pC1YANwJMGyBR9AwOsii5euACm0dMgXKOHnd1/EA3CP6Y5gTF6QkbRCZJ8doAdzJZy+IliIEaCRdaESyEyAAA1o2CBZ4T3rAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA8UlEQVR4nGNgIAMwwhiSfHz/dU0csCq6fOYAw/NPn+BqWdA17JwUhaHJPY+BgeHMgf8wjYwgDax8ImDJhzvacDpJ3qOK4fenN2AbmXApkrJKw8oGAZya8AGcmp4dm4WVjaHpw6FdWA1AFweHhiQ0MEAevdYRgqFJILOTQV7WHB4QKPEUvxDVGTDQHuAMpqX4lTFD797tO1g1hXfPhGtA8dPzT58YD7d0YWgE8UHiyCkC7ieYgL6BAVbbLl64AGeDkxEI3O8wYQhY8QdDAcygZwfYIf5y+IkIhB/TnP6DaGRbYXL/z4nC5VEk0BWja0SWBwBK23Aa6DkIsQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA6klEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXRwm935/eMFzrCMHQpFWxBhwQsBAEx9PzT58YJRkY/scvnMXQidWuNQyPntxjxOq8e7fvYChvD3BmePbxLkpqgWt6/ukT4+GWLhQN2AyB+wkGQKbpGxhgKLp44QJK+oOnPRjYEAERUqw4A6axGYJhE7qCZwfYwbSUw0+4bSia0AG6ITBNAI8PYTo7wFZSAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAA4UlEQVR4nGNkQAKSfHz/GbCA558+MSLzWZA16Jo4YNPDwHDmwH9kjYwwDax8ImCBhzvaMPTIe1Qx/P70Bm4jEyENMHGQGpjzmRhwACmrNKxsvJrwAZyanh2bhZWNoenDoV1YDUAXRwm935/eMFzrCMHQpFWxBhwQsBCEx5NFXhKDkqoKQydWu9agBjlMWElVBUy3BziDMTLYvGEZGMOCHG7Tvdt3oCxUDdgAPGmATNE3MMCq6OKFC2AaPQ3CNYLw/3OiYOxhZwfmoydkDJ3ICu53mIBpxYozKLZgWodFM7rTAK5RZXa0BW/3AAAAAElFTkSuQmCC"]};

/* ==== config.js ==== */
const GAME_VERSION = '1.4.1';
const ITEM_ICONS={"ticket": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAqUlEQVR4nGNgGAWjYBSMgpEOGNEFNBR0/pNr2I0HVxgJ6QepQeazYFN0fZMPWQ44eUTgv7mNDU55Tb8tGGIsuBRX1i3DaVB7UxRWcYusI4z/L9mQFIJMDFQEJ6aRZjkIsJDqS3wAFgLT5+zCkMtMcRtiIUAOgIUALt/S3AEnoCGAHgX4HMRE7RAgVQ8LLUKAlChgGpQhoImlxCI2BMjVOwpGwSgYBSMXAABjrzp0ZgZRiwAAAABJRU5ErkJggg==", "water_bottle": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkklEQVR4nGNgGAWjYKQDRlI1aCjo/Mcnf+PBFZLMZGEgAxiVzcEqfq4rZeiFABM1LSdWDUVRkLfpJF75SX7mDDQLAVoAJnI0ZepyDawDpl/+RjVHsJCj6cajNwz5jzDFNeRESDaLiWGAAdOoAxhGo2CAAdOoAxhGehSwkKOJnCJ30IYAIymKiW3tkNosGwUjGwAAJzgdY5kPaIsAAAAASUVORK5CYII=", "dog_bone": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBSMAiJAT0XAf1rpYyHGgMziWhAFZpd0bGAk1mJS9WEY8vX1WQxMyFek6mNiGGDAiE0Q5Fpo8GEF03ubccoR0oceFYy4FBNyBKkAm+UgMDijAEdqJgvAogtXLmBiGGDAiEtiZKeBHjpmQ5xgZJeE2LIhoexEDX0DUh2PglEwCkYBAIyaqRkpraBqAAAAAElFTkSuQmCC", "ship": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAu0lEQVR4nGNgGAWjYBQMMGCk1AAbG7f/MPaRI7tINo+JYYAB06gDGAYYsBCrUENB5z+pam48uMJINQeAwIkLJxmIBRYG5rSJgo4jz8EYH3tIpQFGYhWC4pfUKKB6GrAgMl5JAYy4JE7Y2BBM9aQAiyNHGAdlGmBB5kRNO4Hw9bISqlqEbPayLAvGQRMFLLg0JDz5AGcvkBEg22Jkc8jOhhpoRSw+B6FbSCgrMhLjAEIOIsXCUTAKRsGgAwAWyEFyx/IPNgAAAABJRU5ErkJggg==", "wine": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4nGNgGAWjYKQDRlIUayjo/CdG3Y0HV4g2l5EUy3eeOEmUWncLc6IdwUSq5XJnLhNUD1JLbGgxMZAIHpnoMlATsBCr8KRDNAMtABMxikDxWffjDtGGgtRSNQ3QEjARq5DYUCDF9yQ5gBhHkGo5yQ7A5whyLKcIgPL5wxdfwZjYPD+0EyGtABPNTB51AJGAiWGkO4CFVA248jxMnNTCiJFUywm1ikhpDYHAgEcBI6kaCBW7dK0PRsGwAAC351jUsrV1lgAAAABJRU5ErkJggg==", "star": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nGNgGAUUgBPTNP6D8IBZ/v9BFBhT4ggm6jqLTg44MU3jv7mXEZwPYpMbCiyELCLVYdjELbJuMOLSw0isLykBJ7edw+kIRmJ8RK5DQBaTHQKUOIQYi0lyACnRgi+4Kc4FFlk3GGG+o4blIEC0YmzRAHMMNjFiHcJIrOX4LMHlOKqkgRNIlhPyHbpDyIkSqlQ6A1pJjYJRMApGwSgYBaNgyAEAwcVxL1yWg+8AAAAASUVORK5CYII=", "scroll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBQMMGDEJnhiQdR/WlhmkbAMwz4mhgEGTIMyCkBAQ0Hn/9lzqxmoAYyNQhluPLjCOChDgIUYRQu78skyPL5sInUcEE+EQeQCJobhGAXxJIQYC7UNJBUwMQznXEBM6LEwkGHIZb9KrOp0N7UzDLkoYBpoBzBiExytjkfBKBgFIwoAAFkEH2Db2x6BAAAAAElFTkSuQmCC", "heart": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVR4nO2VQQqAIBBFNTxM6w7humvUgeoarT2E625TVJsayuaPQgTzNqJ8/A8G1BhFUT7GckJD7Zfzvp+DzcmdcZzyrmno8UIv5+YoVlC+M8Z42adyKQlnEFp/rFN4LERxUHoKpjRV8RtLCvRzsHTWCG/zfxXIkeCUswQkEtxytgAigZRDAhwJtBwWSElIykUCdxLS8my2p5p+QIqiKMrvWAHvP2CUrB7jrgAAAABJRU5ErkJggg==", "rings": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtklEQVR4nO2VwQ2DMAxF7Yg5ukG5dheYj87SXmGDTsAGRkZKJRDBdghCSH4XpJ/I/s4nAOA4juPckc9IVKpWZdlMfUPfRwevXzub4CfWb2R9vZd1TU3UNl4Izw5gaFWmJSPB2pwLMqlm64Zbp2MysFc86luaNoKwt5hyX0oXDURS00RdWi8SwVmEWxggIduc7FUG0JhtzrtQgZI4jeaeayb/mwND8xykm4CWYqlv/pF/geM4cDUToGpdWKlR9JkAAAAASUVORK5CYII="};
let gameTimeline = [];
const SEGMENT_W = 1400;                 // world px per timeline event
let   WORLD_W = 0;                       // = SEGMENT_W * gameTimeline.length, set after timeline loads
const WALK_SPEED = 4.2;
const GROUND_RATIO = 0.80;              // ground line as fraction of height
const PALETTES = {
  clear_day:        { skyT:"#8fd0ff", skyB:"#e8f6ff", far:"#bcd9ef", mid:"#9fbfd8", ground:"#d7c9a8", accent:"#ffffff" },
  sunset:           { skyT:"#ff9a6b", skyB:"#ffd9a0", far:"#c98fb0", mid:"#7d5a86", ground:"#6b5a3e", accent:"#ffe6b3" },
  sunny:            { skyT:"#7ec8ff", skyB:"#eafaff", far:"#9fd0a0", mid:"#7bb37c", ground:"#c9b98a", accent:"#fff6d0" },
  cloudy_coastal:   { skyT:"#9fb3c4", skyB:"#d9e6ee", far:"#8ea6b8", mid:"#6d8598", ground:"#4b6b82", accent:"#eaf3f8" },
  golden_hour:      { skyT:"#f6b25a", skyB:"#ffe2ad", far:"#b98a5a", mid:"#8a6f45", ground:"#7a6440", accent:"#ffedc2" },
  bright_sunny:     { skyT:"#57b8ff", skyB:"#dff3ff", far:"#c7a3e0", mid:"#f28fb0", ground:"#cbb389", accent:"#fff2c0" },
  snow_light:       { skyT:"#b9c6da", skyB:"#eef3fb", far:"#c7d2e0", mid:"#9fb0c6", ground:"#eef2f8", accent:"#ffffff" },
  gentle_rain:      { skyT:"#6f7a8a", skyB:"#aab6c4", far:"#7c8898", mid:"#5f6b7c", ground:"#4f5866", accent:"#dfe7ee" },
  vibrant_daylight: { skyT:"#6fc9ff", skyB:"#eafff0", far:"#8fd6a0", mid:"#59b06f", ground:"#8fb46a", accent:"#fff7d6" },
};

/* ==== state.js ==== */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1;
function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize', resize);
resize();
const state = {
  running:false,
  camX:0,
  hero:{ x:200, facing:1, phase:0, bob:0 },
  wife:{ x:120 },        // trails behind hero (world offset handled in draw)
  creamy:{ x:60 },
  currentEvent:0,
  collected:new Set(),
  collectibles:[],       // {segIndex, worldX, data, taken, float}
  particles:[],
  clouds:[],
  raindrops:[],
  snow:[],
  time:0,
  paletteCur:{...PALETTES.clear_day},
  wifeActive:false,
  creamyActive:false,
  finished:false,
};
function buildCollectibles(){
  state.collectibles = gameTimeline.map((ev,i)=>({
    segIndex:i,
    worldX: i*SEGMENT_W + SEGMENT_W*0.7,
    data:ev,
    taken:false,
    float:Math.random()*Math.PI*2,
  }));
}
function buildClouds(){
  state.clouds = [];
  for(let i=0;i<40;i++){
    state.clouds.push({
      x: Math.random()*WORLD_W,
      y: 40 + Math.random()*180,
      s: 0.6 + Math.random()*1.1,
      spd: 0.15 + Math.random()*0.25,
    });
  }
}

/* ==== input.js ==== */
const keys = { left:false, right:false };
window.addEventListener('keydown', e=>{
  if(e.key==='a'||e.key==='A'||e.key==='ArrowLeft'){ keys.left=true; }
  if(e.key==='d'||e.key==='D'||e.key==='ArrowRight'){ keys.right=true; }
});
window.addEventListener('keyup', e=>{
  if(e.key==='a'||e.key==='A'||e.key==='ArrowLeft'){ keys.left=false; }
  if(e.key==='d'||e.key==='D'||e.key==='ArrowRight'){ keys.right=false; }
});
function bindTouch(el, which){
  const on = ()=>{ keys[which]=true; ensureAudio(); };
  const off= ()=>{ keys[which]=false; };
  el.addEventListener('touchstart', e=>{e.preventDefault();on();}, {passive:false});
  el.addEventListener('touchend', e=>{e.preventDefault();off();}, {passive:false});
  el.addEventListener('mousedown', on); el.addEventListener('mouseup', off);
  el.addEventListener('mouseleave', off);
}
bindTouch(document.getElementById('btnL'),'left');
bindTouch(document.getElementById('btnR'),'right');
if('ontouchstart' in window){ document.getElementById('touch').style.display='flex'; }

/* ==== audio.js ==== */
let audioCtx=null, musicGain=null, musicTimer=null, currentMood=null;
let bgMusic=null, bgStarted=false;
const MUSIC_SRC = 'audio/mood_piece.mp3';
const MUSIC_TARGET_VOL = 0.5;
function startBgTrack(){
  if(bgStarted) return;
  bgStarted=true;
  try{
    bgMusic = new Audio(MUSIC_SRC);
    bgMusic.loop = true;
    bgMusic.preload = 'auto';
    bgMusic.volume = 0;
    const p = bgMusic.play();
    if(p && p.catch) p.catch(()=>{ bgStarted=false; }); // will retry on next gesture
    let v=0;
    const fade=setInterval(()=>{
      if(!bgMusic){ clearInterval(fade); return; }
      v=Math.min(MUSIC_TARGET_VOL, v+0.02);
      bgMusic.volume=v;
      if(v>=MUSIC_TARGET_VOL) clearInterval(fade);
    }, 120);
  }catch(e){ bgStarted=false; }
}
function ensureAudio(){
  startBgTrack();               // real tranquil loop (primary)
  if(audioCtx) return;
  try{
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    musicGain = audioCtx.createGain();
    musicGain.gain.value = 0.018;  // quiet texture layer under the real track
    musicGain.connect(audioCtx.destination);
    startMusic();
  }catch(e){  }
}
const MOODS = {
  clear_day:[0,4,7,11], sunset:[0,3,7,10], sunny:[0,4,7,9], cloudy_coastal:[0,3,5,10],
  golden_hour:[0,4,7,11], bright_sunny:[0,4,7,12], snow_light:[0,2,7,9],
  gentle_rain:[0,3,7,10], vibrant_daylight:[0,4,7,11],
};
function midiToFreq(m){ return 440*Math.pow(2,(m-69)/12); }
function startMusic(){
  if(!audioCtx) return;
  let step=0;
  musicTimer = setInterval(()=>{
    if(!state.running || !audioCtx) return;
    const mood = currentMood || 'clear_day';
    const scale = MOODS[mood] || MOODS.clear_day;
    const root = 57; // A3
    const note = root + scale[step % scale.length] + (step%8<4?0:12);
    playTone(midiToFreq(note), 0.55, 'sine', 0.05);
    if(step%4===0) playTone(midiToFreq(note-12), 1.6, 'triangle', 0.03);
    step++;
  }, 480);
}
function playTone(freq, dur, type, vol){
  if(!audioCtx) return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0, audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(vol, audioCtx.currentTime+0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+dur);
  o.connect(g); g.connect(musicGain);
  o.start(); o.stop(audioCtx.currentTime+dur+0.05);
}
function chime(){ // pickup cue: quick 3-note sparkle
  if(!audioCtx) return;
  [0,4,7].forEach((s,i)=>{
    setTimeout(()=>playTone(midiToFreq(72+s), 0.4, 'sine', 0.09), i*70);
  });
}

/* ==== helpers.js ==== */
function lerp(a,b,t){ return a+(b-a)*t; }
function hexToRgb(h){ const n=parseInt(h.slice(1),16); return [n>>16&255,n>>8&255,n&255]; }
function mixHex(a,b,t){ const A=hexToRgb(a),B=hexToRgb(b);
  return `rgb(${Math.round(lerp(A[0],B[0],t))},${Math.round(lerp(A[1],B[1],t))},${Math.round(lerp(A[2],B[2],t))})`; }
function lerpPalette(pa,pb,t){
  const o={};
  for(const k in pa){ o[k]=mixHex(pa[k],pb[k],t); }
  return o;
}
function heroWorldX(){ return state.hero.x; }
function segmentAt(worldX){
  return Math.max(0, Math.min(gameTimeline.length-1, Math.floor(worldX / SEGMENT_W)));
}

/* ==== ui.js ==== */
function showToast(ev){
  const wrap=document.getElementById('toasts');
  const t=document.createElement('div'); t.className='toast';
  const iconSrc = (typeof ITEM_ICONS!=='undefined') ? ITEM_ICONS[ev.collectible.icon] : null;
  const iconImg = iconSrc
    ? `<img class="toast-icon" src="${iconSrc}" alt="${ev.collectible.name}" width="64" height="64">`
    : '';
  t.innerHTML=`<div class="h">${ev.title}</div>
    <div class="b">${ev.eventNote}</div>
    ${iconImg}
    <div class="item">✨ Collected: ${ev.collectible.name}</div>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),500); }, 4200);
}
function updateHUD(){
  const ev = gameTimeline[state.currentEvent];
  document.getElementById('hDate').textContent = ev.date;
  document.getElementById('hTitle').textContent = ev.title;
  document.getElementById('hLoc').textContent = ev.location;
  document.getElementById('hItems').textContent = state.collected.size;
  document.getElementById('hTotal').textContent = gameTimeline.length;
  let party='🧑';
  if(state.wifeActive) party+=' 👩';
  if(state.creamyActive) party+=' 🐕';
  document.getElementById('hParty').textContent = party;
  const prog = Math.min(1, heroWorldX()/(WORLD_W - SEGMENT_W*0.15));
  document.getElementById('pFill').style.width = (prog*100)+'%';
}
function buildProgressNodes(){
  const bar=document.getElementById('progress');
  bar.querySelectorAll('.node').forEach(n=>n.remove());
  gameTimeline.forEach((ev,i)=>{
    const n=document.createElement('div'); n.className='node'; n.dataset.i=i;
    n.style.left = ((i/(gameTimeline.length-1))*100)+'%';
    bar.appendChild(n);
  });
}
function refreshNodes(){
  document.querySelectorAll('#progress .node').forEach(n=>{
    if(state.collected.has(+n.dataset.i)) n.classList.add('reached');
  });
}

/* ==== scenery.js ==== */
function groundY(){ return H*GROUND_RATIO; }
function drawSky(pal){
  const g=ctx.createLinearGradient(0,0,0,groundY());
  g.addColorStop(0,pal.skyT); g.addColorStop(1,pal.skyB);
  ctx.fillStyle=g; ctx.fillRect(0,0,W,groundY());
}
function drawSun(pal, bg){
  const warm = ['sunset','golden_hour','clear_day','sunny','bright_sunny','vibrant_daylight'];
  const isWarm = warm.includes(bg.weather);
  const cx = W*0.78, cy = H*0.22;
  ctx.save();
  const grad=ctx.createRadialGradient(cx,cy,10,cx,cy,120);
  grad.addColorStop(0, isWarm?'rgba(255,240,200,0.95)':'rgba(230,240,255,0.85)');
  grad.addColorStop(1,'rgba(255,240,200,0)');
  ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(cx,cy,120,0,7); ctx.fill();
  ctx.fillStyle= isWarm?'#fff3cf':'#eef3ff';
  ctx.beginPath(); ctx.arc(cx,cy,34,0,7); ctx.fill();
  ctx.restore();
}
function drawClouds(pal){
  ctx.save();
  for(const c of state.clouds){
    const px = c.x - state.camX*c.spd*0.4;
    let x = ((px % WORLD_W)+WORLD_W)%WORLD_W;
    x = x - state.camX*0; // already offset
    const screenX = c.x - state.camX*c.spd;
    const sx = ((screenX % (W+400))+(W+400))%(W+400) - 200;
    ctx.fillStyle='rgba(255,255,255,0.55)';
    puff(sx, c.y, 34*c.s);
  }
  ctx.restore();
}
function puff(x,y,r){
  ctx.beginPath();
  ctx.arc(x,y,r,0,7); ctx.arc(x+r*0.8,y+6,r*0.8,0,7);
  ctx.arc(x-r*0.8,y+6,r*0.7,0,7); ctx.arc(x+r*0.3,y-r*0.5,r*0.7,0,7);
  ctx.fill();
}
const LAYER_DRAW = {
  mountains(base, gy, pal, o){
    const col=o.color||pal.far; const peaks=o.peaks||[[60,380,240],[360,460,300]];
    for(const [px,pw,ph] of peaks){
      ctx.fillStyle=col; mountain(base+px, gy, pw, ph); ctx.fill();
      ctx.fillStyle='rgba(0,0,0,0.10)';
      ctx.beginPath(); ctx.moveTo(base+px+pw*0.5, gy-ph); ctx.lineTo(base+px+pw, gy); ctx.lineTo(base+px+pw*0.5, gy); ctx.closePath(); ctx.fill();
      if(o.snow){ ctx.fillStyle='rgba(255,255,255,0.9)';
        ctx.beginPath(); ctx.moveTo(base+px+pw*0.5, gy-ph);
        ctx.lineTo(base+px+pw*0.5-ph*0.13, gy-ph*0.72); ctx.lineTo(base+px+pw*0.5+ph*0.13, gy-ph*0.72);
        ctx.closePath(); ctx.fill(); }
    }
  },
  hills(base, gy, pal, o){
    ctx.fillStyle=o.color||pal.far;
    hill(base, gy, W, o.h||110); ctx.fill();
    if(o.h2){ ctx.fillStyle='rgba(0,0,0,0.06)'; hill(base+W*0.3, gy, W*0.8, o.h2); ctx.fill(); }
  },
  skyline(base, gy, pal, o){
    const col=o.color||pal.far; const n=o.count||6;
    for(let i=0;i<n;i++){
      const bx=base+40+i*((W-80)/n); const bw=(o.w||70); const bh=(o.h||150)+((i*53)%70);
      ctx.fillStyle=col; roundRect(bx,gy-bh,bw,bh,4); ctx.fill();
      ctx.fillStyle=o.lit||'rgba(255,240,190,0.5)';
      for(let wy=gy-bh+10; wy<gy-14; wy+=14)
        for(let wx=bx+6; wx<bx+bw-8; wx+=12)
          if(((wx+wy)|0)%3!==0) ctx.fillRect(wx,wy,6,7);
    }
  },
  terminal(base, gy, pal, o){
    const col=o.color||pal.far;
    ctx.fillStyle=col; roundRect(base+30,gy-120,W-60,120,8); ctx.fill();
    ctx.fillStyle='rgba(200,230,255,0.4)'; ctx.fillRect(base+40,gy-96,W-80,26);
    ctx.fillStyle=col; ctx.fillRect(base+W*0.7,gy-210,26,210);
    ctx.fillStyle='rgba(210,235,255,0.85)'; roundRect(base+W*0.7-8,gy-224,42,26,6); ctx.fill();
  },
  airplane(base, gy, pal, o){
    const period = o.period || 520;          // frames per full fly-by cycle
    const t = (state.time % period) / period; // 0..1 progress through the cycle
    const startY = gy - 70;                   // enters low on the left, already flying
    const climbTop = H * 0.12;                // how high it climbs
    if(t >= 0.82) return;
    const p = t / 0.82;
    const x = -60 + p * (W + 120);            // left edge to off the right edge
    const y = startY - (p*p) * (startY - climbTop);   // ease-in climb
    const ang = -0.34 * Math.min(1, p*2.2);           // nose up, capped
    drawPlane(x, y, ang, o.scale || 1, Math.max(0.25, p));
  },
  trees(base, gy, pal, o){
    const n=o.density||7; const col=o.color||pal.mid;
    for(let i=0;i<n;i++){ const x=base+70+i*((W-120)/n); const s=(o.scale||1)*(0.85+((i*37)%40)/100);
      tree(x, gy, s, col);
      ctx.fillStyle='rgba(0,0,0,0.08)'; ctx.beginPath(); ctx.arc(x, gy-42*s, 20*s, 0.1, Math.PI-0.1); ctx.fill();
    }
  },
  vineyard(base, gy, pal, o){
    const col=o.color||pal.mid;
    for(let i=0;i<10;i++){ const x=base+40+i*130;
      ctx.fillStyle=col; ctx.fillRect(x,gy-40,90,40);
      ctx.fillStyle='rgba(0,0,0,0.10)'; ctx.fillRect(x,gy-40,90,8);
      ctx.fillStyle='rgba(90,70,50,0.5)'; ctx.fillRect(x+10,gy-52,4,14); ctx.fillRect(x+76,gy-52,4,14);
    }
  },
  castles(base, gy, pal, o){ castle(base+180, gy); castle(base+W*0.62, gy); },
  winterCity(base, gy, pal, o){
    const col=o.color||pal.far;
    for(let i=0;i<6;i++){ const bx=base+50+i*((W-80)/6); const bh=150+((i%2)*34);
      ctx.fillStyle=col; roundRect(bx,gy-bh,100,bh,6); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fillRect(bx-2,gy-bh-4,104,8);   // snow cap
      ctx.fillStyle=o.lit||'rgba(255,236,180,0.55)';
      for(let wy=gy-bh+14; wy<gy-16; wy+=16) for(let wx=bx+10; wx<bx+90; wx+=16)
        if(((wx*wy)|0)%2===0) ctx.fillRect(wx,wy,7,8);
    }
  },
  sailboats(base, gy, pal, o){ for(let i=0;i<4;i++) sailboat(base+140+i*260, gy-10); },
  indoorCare(base, gy, pal, o){
    ctx.fillStyle=o.wall||'rgba(120,96,80,0.35)'; ctx.fillRect(base,gy-260,W,260);
    ctx.fillStyle='rgba(180,205,235,0.5)'; roundRect(base+W*0.55,gy-210,200,150,10); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(base+W*0.55,gy-64,210,10);   // sill
  },
};
function drawSceneryLayer(kind, speed, pal, opts){
  const fn=LAYER_DRAW[kind]; if(!fn) return;
  const gy=groundY();
  if(opts && opts.screenSpace){ fn(0, gy, pal, opts||{}); return; }
  const off=state.camX*speed;
  ctx.save();
  ctx.translate(-off%W - W, 0);   // 3× tiling for seamless wrap
  for(let tile=0; tile<3; tile++) fn(tile*W, gy, pal, opts||{});
  ctx.restore();
}
function deriveScenery(ev){
  const t=ev.backgroundType;
  const M={
    airport_terminal:      [ {kind:'skyline',speed:0.5,opts:{count:5,h:90}}, {kind:'terminal',speed:0.25}, {kind:'airplane',speed:0,opts:{screenSpace:true,scale:1.1}} ],
    park_and_city:         [ {kind:'hills',speed:0.2,opts:{h:120,h2:80}}, {kind:'skyline',speed:0.4,opts:{count:4,w:60,h:150}}, {kind:'trees',speed:0.55,opts:{density:7}} ],
    suburban_driveway:     [ {kind:'hills',speed:0.2,opts:{h:110}}, {kind:'trees',speed:0.55,opts:{density:6}} ],
    ocean_ferry_cruise:    [ {kind:'hills',speed:0.2,opts:{h:70}}, {kind:'sailboats',speed:0.5} ],
    mountain_resort_vineyard:[ {kind:'mountains',speed:0.18,opts:{snow:true}}, {kind:'vineyard',speed:0.55} ],
    theme_park_castles:    [ {kind:'hills',speed:0.2,opts:{h:80}}, {kind:'castles',speed:0.45} ],
    cozy_winter_city:      [ {kind:'winterCity',speed:0.25}, {kind:'trees',speed:0.55,opts:{density:8,color:'#e9eef6',scale:0.8}} ],
    cozy_indoor_care:      [ {kind:'indoorCare',speed:0.3} ],
    lakeside_trees_wedding:[ {kind:'mountains',speed:0.18,opts:{peaks:[[80,400,180]]}}, {kind:'hills',speed:0.28,opts:{h:90}}, {kind:'trees',speed:0.55,opts:{density:8}} ],
  };
  return { layers: M[t] || [ {kind:'hills',speed:0.2,opts:{h:100}}, {kind:'trees',speed:0.55,opts:{density:6}} ] };
}
function sceneryFor(ev){ return ev.scenery || (ev.__scenery ||= deriveScenery(ev)); }
function drawSegmentScenery(ev, pal, alpha){
  const sc=sceneryFor(ev);
  ctx.save(); ctx.globalAlpha=alpha;
  for(const L of sc.layers) drawSceneryLayer(L.kind, L.speed, pal, L.opts);
  ctx.restore();
}
function roundRect(x,y,w,h,r){ ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function hill(x,gy,w,h){ ctx.beginPath(); ctx.moveTo(x,gy);
  ctx.quadraticCurveTo(x+w*0.5, gy-h, x+w, gy); ctx.lineTo(x+w,gy); ctx.closePath(); }
function mountain(x,gy,w,h){ ctx.beginPath(); ctx.moveTo(x,gy);
  ctx.lineTo(x+w*0.5, gy-h); ctx.lineTo(x+w, gy); ctx.closePath(); }
function tree(x,gy,s,color){
  ctx.fillStyle='#6b4a2f'; ctx.fillRect(x-4*s, gy-40*s, 8*s, 40*s);
  ctx.fillStyle=color; ctx.beginPath();
  ctx.arc(x, gy-52*s, 26*s,0,7); ctx.arc(x-18*s, gy-40*s, 20*s,0,7); ctx.arc(x+18*s, gy-40*s, 20*s,0,7);
  ctx.fill();
}
function mountainSnow(){}
function castle(x,gy){
  ctx.fillStyle=PALETTES.theme_park_castles?PALETTES.theme_park_castles.mid:'#f28fb0';
  ctx.fillStyle='#e6d7f2';
  ctx.fillRect(x, gy-160, 120, 160);
  ctx.beginPath(); ctx.moveTo(x-6,gy-160); ctx.lineTo(x+60,gy-230); ctx.lineTo(x+126,gy-160); ctx.closePath();
  ctx.fillStyle='#c48ad0'; ctx.fill();
  ctx.fillStyle='#e6d7f2';
  ctx.fillRect(x-24,gy-120,24,120); ctx.fillRect(x+120,gy-120,24,120);
  ctx.fillStyle='#c48ad0';
  ctx.beginPath(); ctx.moveTo(x-30,gy-120); ctx.lineTo(x-12,gy-150); ctx.lineTo(x+6,gy-120); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x+114,gy-120); ctx.lineTo(x+132,gy-150); ctx.lineTo(x+150,gy-120); ctx.fill();
}
function tent(x,gy){ ctx.beginPath(); ctx.moveTo(x-40,gy); ctx.lineTo(x,gy-70); ctx.lineTo(x+40,gy); ctx.closePath(); ctx.fill(); }
function sailboat(x,y){ ctx.fillStyle='rgba(255,255,255,0.8)';
  ctx.beginPath(); ctx.moveTo(x,y-40); ctx.lineTo(x,y); ctx.lineTo(x+26,y); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(60,40,30,0.7)'; ctx.fillRect(x-14,y,44,8); }
function drawPlane(x, y, ang, s, t){
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  if(t > 0.2){
    const g=ctx.createLinearGradient(-16,0,-90,0);
    g.addColorStop(0,'rgba(255,255,255,0.5)'); g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g; ctx.fillRect(-90,-2,78,4);
  }
  ctx.fillStyle='#eef2f7';
  roundRect(-20,-5,44,10,5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(20,-4); ctx.lineTo(30,0); ctx.lineTo(20,4); ctx.closePath(); ctx.fill(); // nose
  ctx.beginPath(); ctx.moveTo(-20,-4); ctx.lineTo(-26,-16); ctx.lineTo(-14,-4); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#cfd8e3';
  ctx.beginPath(); ctx.moveTo(-2,2); ctx.lineTo(-16,14); ctx.lineTo(2,4); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#7fb3e0';
  for(let wx=-12; wx<14; wx+=6) ctx.fillRect(wx,-2,3,3);
  ctx.strokeStyle='#e0556b'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-18,1); ctx.lineTo(22,1); ctx.stroke();
  ctx.restore();
}
function drawGround(pal, bg){
  const gy=groundY();
  ctx.fillStyle=pal.ground;
  ctx.fillRect(0,gy,W,H-gy);
  if(bg.backgroundType==='ocean_ferry_cruise'){
    const g=ctx.createLinearGradient(0,gy,0,H);
    g.addColorStop(0,'#5b86a8'); g.addColorStop(1,'#385f7d');
    ctx.fillStyle=g; ctx.fillRect(0,gy,W,H-gy);
    ctx.strokeStyle='rgba(255,255,255,0.25)'; ctx.lineWidth=2;
    for(let i=0;i<10;i++){ const y=gy+18+i*22 + Math.sin(state.time*0.05+i)*3;
      ctx.beginPath(); ctx.moveTo(0,y); for(let x=0;x<=W;x+=40){ ctx.lineTo(x, y+Math.sin((x+state.camX)*0.02+i)*3);} ctx.stroke(); }
  } else {
    ctx.strokeStyle='rgba(0,0,0,0.12)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(0,gy+2); ctx.lineTo(W,gy+2); ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=4; ctx.setLineDash([26,26]);
    ctx.lineDashOffset = -state.camX%52;
    ctx.beginPath(); ctx.moveTo(0,gy+ (H-gy)*0.5); ctx.lineTo(W,gy+(H-gy)*0.5); ctx.stroke();
    ctx.setLineDash([]);
  }
}
function drawSpecialObjects(){
  const seg = state.collectibles[2]; // Creamy segment
  const teslaWorldX = 2*SEGMENT_W + SEGMENT_W*0.45;
  const sx = teslaWorldX - state.camX;
  if(sx > -260 && sx < W+120){
    const gy=groundY();
    ctx.save();
    ctx.fillStyle='#d32b3a';
    roundRect(sx, gy-70, 220, 54, 14); ctx.fill();
    roundRect(sx+34, gy-100, 150, 44, 18); ctx.fill();
    ctx.fillStyle='rgba(210,235,255,0.85)'; roundRect(sx+46, gy-94, 120, 32, 10); ctx.fill();
    ctx.fillStyle='#b02330'; ctx.save();
    ctx.translate(sx+200, gy-96); ctx.rotate(-0.5); roundRect(0,0,70,14,6); ctx.fill(); ctx.restore();
    ctx.fillStyle='#1a1a1a';
    ctx.beginPath(); ctx.arc(sx+50,gy-14,20,0,7); ctx.arc(sx+170,gy-14,20,0,7); ctx.fill();
    ctx.fillStyle='#555';
    ctx.beginPath(); ctx.arc(sx+50,gy-14,9,0,7); ctx.arc(sx+170,gy-14,9,0,7); ctx.fill();
    ctx.restore();
  }
}
function drawCollectibles(){
  const gy=groundY();
  for(const c of state.collectibles){
    if(c.taken) continue;
    const sx=c.worldX - state.camX;
    if(sx<-60||sx>W+60) continue;
    c.float += 0.05;
    const fy = gy-70 + Math.sin(c.float)*8;
    ctx.save();
    const g=ctx.createRadialGradient(sx,fy,2,sx,fy,34);
    g.addColorStop(0,'rgba(255,215,150,0.55)'); g.addColorStop(1,'rgba(255,215,150,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(sx,fy,34,0,7); ctx.fill();
    ctx.restore();
    drawIcon(c.data.collectible.icon, sx, fy);
  }
}
function drawIcon(icon, x, y){
  ctx.save(); ctx.translate(x,y);
  ctx.lineWidth=2; ctx.strokeStyle='rgba(0,0,0,0.25)';
  switch(icon){
    case 'ticket': ctx.fillStyle='#ffd27a'; roundRect(-16,-11,32,22,4); ctx.fill(); ctx.stroke();
      ctx.strokeStyle='#b98a2a'; ctx.setLineDash([2,3]); ctx.beginPath(); ctx.moveTo(4,-11); ctx.lineTo(4,11); ctx.stroke(); ctx.setLineDash([]); break;
    case 'water_bottle': ctx.fillStyle='#7fd0ff'; roundRect(-8,-16,16,30,6); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#4a9fd0'; ctx.fillRect(-6,-20,12,6); break;
    case 'dog_bone': ctx.fillStyle='#f3e3c0'; ctx.beginPath();
      ctx.arc(-14,-8,7,0,7); ctx.arc(-14,8,7,0,7); ctx.arc(14,-8,7,0,7); ctx.arc(14,8,7,0,7);
      ctx.fill(); ctx.fillRect(-14,-6,28,12); ctx.stroke(); break;
    case 'ship': ctx.fillStyle='#e8e8ee'; ctx.beginPath(); ctx.moveTo(-18,4); ctx.lineTo(18,4); ctx.lineTo(12,16); ctx.lineTo(-12,16); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#d34a4a'; ctx.fillRect(-4,-16,4,20); ctx.beginPath(); ctx.moveTo(0,-16); ctx.lineTo(14,-4); ctx.lineTo(0,-4); ctx.fill(); break;
    case 'wine': ctx.fillStyle='#b5335a'; ctx.beginPath(); ctx.moveTo(-9,-14); ctx.lineTo(9,-14); ctx.quadraticCurveTo(6,2,0,2); ctx.quadraticCurveTo(-6,2,-9,-14); ctx.fill();
      ctx.strokeStyle='#7a2440'; ctx.beginPath(); ctx.moveTo(0,2); ctx.lineTo(0,14); ctx.moveTo(-8,15); ctx.lineTo(8,15); ctx.stroke(); break;
    case 'star': ctx.fillStyle='#ffe27a'; star(0,0,5,15,7); ctx.fill(); ctx.stroke(); break;
    case 'scroll': ctx.fillStyle='#f4ecd6'; roundRect(-15,-12,30,24,3); ctx.fill(); ctx.stroke();
      ctx.strokeStyle='#c9b184'; ctx.beginPath(); ctx.moveTo(-9,-4); ctx.lineTo(9,-4); ctx.moveTo(-9,2); ctx.lineTo(9,2); ctx.stroke(); break;
    case 'heart': heartPath(0,0,16); ctx.fillStyle='#ff6b8f'; ctx.fill(); ctx.stroke(); break;
    case 'rings': ctx.strokeStyle='#ffd27a'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-6,0,10,0,7); ctx.arc(7,0,10,0,7); ctx.stroke();
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(-6,-11,3,0,7); ctx.fill(); break;
    default: ctx.fillStyle='#ffd27a'; ctx.beginPath(); ctx.arc(0,0,12,0,7); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}
function star(cx,cy,spikes,outer,inner){ let rot=Math.PI/2*3, x=cx,y=cy; const step=Math.PI/spikes;
  ctx.beginPath(); ctx.moveTo(cx,cy-outer);
  for(let i=0;i<spikes;i++){ x=cx+Math.cos(rot)*outer; y=cy+Math.sin(rot)*outer; ctx.lineTo(x,y); rot+=step;
    x=cx+Math.cos(rot)*inner; y=cy+Math.sin(rot)*inner; ctx.lineTo(x,y); rot+=step; }
  ctx.lineTo(cx,cy-outer); ctx.closePath(); }
function heartPath(x,y,s){ ctx.beginPath(); const t=s*0.5;
  ctx.moveTo(x,y+t*0.6);
  ctx.bezierCurveTo(x,y-t*0.4, x-s, y-t*0.4, x-s, y+t*0.2);
  ctx.bezierCurveTo(x-s, y+t, x, y+t*1.4, x, y+s);
  ctx.bezierCurveTo(x, y+t*1.4, x+s, y+t, x+s, y+t*0.2);
  ctx.bezierCurveTo(x+s, y-t*0.4, x, y-t*0.4, x, y+t*0.6);
  ctx.closePath(); }

/* ==== characters.js ==== */
const SPRITE_IMGS = { husband:[], wife:[], creamy:[], ready:false };
function loadSprites(){
  let pending=0, done=0;
  for(const who of ['husband','wife','creamy']){
    for(const src of (SPRITES[who]||[])){
      pending++;
      const img=new Image();
      img.onload=()=>{ done++; if(done>=pending) SPRITE_IMGS.ready=true; };
      img.onerror=()=>{ done++; if(done>=pending) SPRITE_IMGS.ready=true; };
      img.src=src;
      SPRITE_IMGS[who].push(img);
    }
  }
  if(pending===0) SPRITE_IMGS.ready=true;
}
const OUTFITS = ['casual', 'wedding', 'cozy'];   // 'casual' == base SPRITES frames
const MILESTONE_OUTFITS = {
  0: 'casual',    // The First Glance ... through
  6: 'wedding',   // idx6 = "Legally Married" (Dec 2022) -> tux & gown
  7: 'cozy',      // idx7 = "In Sickness and In Health" (recovery home) -> cozy
  8: 'wedding',   // idx8 = "Grand Wedding Ceremony" -> gown & tux again
};
const WardrobeManager = {
  current: { husband: 'casual', wife: 'casual' },   // live outfit per character
  loaded: false,
  load(){
    if(this.loaded) return;
    SPRITE_IMGS['husband_casual'] = SPRITE_IMGS.husband;
    SPRITE_IMGS['wife_casual']    = SPRITE_IMGS.wife;
    if(typeof OUTFIT_SPRITES !== 'undefined'){
      for(const key in OUTFIT_SPRITES){          // e.g. "husband_wedding"
        SPRITE_IMGS[key] = OUTFIT_SPRITES[key].map(src=>{ const im=new Image(); im.src=src; return im; });
      }
    }
    this.loaded = true;
  },
  outfitForEvent(idx){
    let outfit = 'casual';
    for(let i=0; i<=idx; i++){ if(MILESTONE_OUTFITS[i]) outfit = MILESTONE_OUTFITS[i]; }
    return outfit;
  },
  framesFor(who){
    const key = `${who}_${this.current[who]}`;
    return SPRITE_IMGS[key] && SPRITE_IMGS[key].length ? SPRITE_IMGS[key] : SPRITE_IMGS[who];
  },
  syncToEvent(idx){
    const target = this.outfitForEvent(idx);
    for(const who of ['husband','wife']){
      if(this.current[who] !== target){
        this.current[who] = target;
        this._transition(who, target);
      }
    }
  },
  _transition(who, outfit){
    if(!state.running) return;
    const gy = groundY();
    const baseX = (who === 'wife') ? state.hero.x - 62 : state.hero.x;
    const sx = baseX - state.camX;
    const cy = gy - 40;
    const palette = outfit === 'wedding' ? ['#fff6d8','#ffe27a','#ffffff']
                  : outfit === 'cozy'    ? ['#ffd1a6','#ffb877','#fff0dc']
                  :                        ['#ff8fb1','#ffd27a','#ffffff'];
    for(let i=0;i<30;i++){
      const a=Math.random()*Math.PI*2, sp=1.2+Math.random()*3.2;
      state.particles.push({
        x:sx, y:cy, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp-1.2, life:1,
        heart:Math.random()<0.25,
        col:palette[(Math.random()*palette.length)|0],
      });
    }
    state.wardrobePop = state.wardrobePop || {};
    state.wardrobePop[who] = 1;   // decays in update()
  },
  reset(){ this.current.husband='casual'; this.current.wife='casual'; }
};
function drawSprite(frames, x, gy, displayH, walkPhase, facing, moving, speedMul){
  if(!frames || !frames.length) return false;
  const n=frames.length;
  const idx = moving ? (Math.floor(walkPhase*(speedMul||1.4)) % n + n) % n : 0;
  const img=frames[idx];
  if(!img || !img.complete || !img.naturalWidth) return false;
  const bob = moving ? Math.abs(Math.sin(walkPhase))*3 : 0;
  const scale = displayH / img.naturalHeight;
  const w = img.naturalWidth*scale, h=displayH;
  ctx.save();
  ctx.imageSmoothingEnabled=false; // crisp pixel art
  ctx.translate(x, gy - bob);
  if(facing<0) ctx.scale(-1,1);
  ctx.drawImage(img, -w/2, -h, w, h);
  ctx.restore();
  return true;
}
const HUMAN_HEIGHTS = { wife: 72, husband: 81 };
function drawHuman(x, gy, opts){
  const moving = opts.moving!==false;
  const frames = (WardrobeManager.loaded ? WardrobeManager.framesFor(opts.who) : SPRITE_IMGS[opts.who]) || [];
  const dh = HUMAN_HEIGHTS[opts.who] || 72;
  const pop = (state.wardrobePop && state.wardrobePop[opts.who]) || 0;
  if(pop > 0){
    const s = 1 + pop*0.28;                 // up to +28% then eases back
    ctx.save(); ctx.translate(x, gy); ctx.scale(s, s); ctx.translate(-x, -gy);
    const drawn = drawSprite(frames, x, gy, dh, opts.walkPhase, opts.facing, moving, 1.4);
    ctx.restore();
    if(drawn) return;
  } else if(drawSprite(frames, x, gy, dh, opts.walkPhase, opts.facing, moving, 1.4)) return;
  const bob=Math.abs(Math.sin(opts.walkPhase))*3; const y=gy-bob;
  ctx.save(); ctx.translate(x,0);
  const legSwing=Math.sin(opts.walkPhase)*10;
  ctx.strokeStyle=opts.pants||'#39406a'; ctx.lineWidth=7; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(0,y-38); ctx.lineTo(legSwing*0.5,y-2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,y-38); ctx.lineTo(-legSwing*0.5,y-2); ctx.stroke();
  if(opts.dress){ ctx.fillStyle=opts.dress; ctx.beginPath();
    ctx.moveTo(-8,y-64); ctx.lineTo(8,y-64); ctx.lineTo(15,y-30); ctx.lineTo(-15,y-30); ctx.closePath(); ctx.fill(); }
  else { ctx.fillStyle=opts.shirt; roundRect(-9,y-64,18,30,6); ctx.fill(); }
  ctx.strokeStyle=opts.shirt; ctx.lineWidth=6;
  ctx.beginPath(); ctx.moveTo(0,y-58); ctx.lineTo(opts.facing*(8+-legSwing*0.4), y-40); ctx.stroke();
  ctx.fillStyle=opts.skin; ctx.beginPath(); ctx.arc(0,y-74,11,0,7); ctx.fill();
  ctx.fillStyle=opts.hair;
  if(opts.longHair){ ctx.beginPath(); ctx.arc(0,y-77,12,Math.PI,0); ctx.fill();
    ctx.fillRect(-12,y-78,5,22); ctx.fillRect(7,y-78,5,22); }
  else { ctx.beginPath(); ctx.arc(0,y-78,11,Math.PI,0); ctx.fill(); ctx.fillRect(-11,y-79,22,5); }
  ctx.restore();
}
function drawCreamy(x, gy, walkPhase, facing, moving){
  if(drawSprite(SPRITE_IMGS.creamy, x, gy, 34, walkPhase, (facing||1), moving!==false, 1.2)) return;
  const bob=Math.abs(Math.sin(walkPhase*1.4))*2; const y=gy-bob;
  ctx.save(); ctx.translate(x,0);
  const legSwing=Math.sin(walkPhase*1.4)*6;
  ctx.fillStyle='#f0dfb8'; roundRect(-22,y-30,44,20,10); ctx.fill();
  ctx.beginPath(); ctx.arc(20,y-32,12,0,7); ctx.fill();
  ctx.fillStyle='#e0cb9a'; ctx.beginPath(); ctx.ellipse(15,y-40,4,8,-0.3,0,7); ctx.fill();
  ctx.fillStyle='#f6ecd2'; ctx.beginPath(); ctx.arc(30,y-30,6,0,7); ctx.fill();
  ctx.fillStyle='#333'; ctx.beginPath(); ctx.arc(33,y-31,2,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(23,y-34,1.6,0,7); ctx.fill();
  ctx.strokeStyle='#e0cb9a'; ctx.lineWidth=5; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-14,y-12); ctx.lineTo(-14+legSwing,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(14,y-12); ctx.lineTo(14-legSwing,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-22,y-26); ctx.lineTo(-34,y-34-Math.sin(walkPhase*3)*5); ctx.stroke();
  ctx.restore();
}

/* ==== effects.js ==== */
function drawWeather(bg){
  const w=bg.weather;
  if(w==='gentle_rain'){
    ctx.strokeStyle='rgba(200,220,240,0.5)'; ctx.lineWidth=1.5;
    if(state.raindrops.length<120){ for(let i=state.raindrops.length;i<120;i++)
      state.raindrops.push({x:Math.random()*W,y:Math.random()*H,l:8+Math.random()*8,s:6+Math.random()*4}); }
    for(const d of state.raindrops){ ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(d.x-2,d.y+d.l); ctx.stroke();
      d.y+=d.s; if(d.y>H){ d.y=-10; d.x=Math.random()*W; } }
  } else if(w==='snow_light'){
    ctx.fillStyle='rgba(255,255,255,0.85)';
    if(state.snow.length<90){ for(let i=state.snow.length;i<90;i++)
      state.snow.push({x:Math.random()*W,y:Math.random()*H,r:1.5+Math.random()*2.5,s:0.6+Math.random()*1,d:Math.random()*7}); }
    for(const f of state.snow){ ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.fill();
      f.y+=f.s; f.x+=Math.sin(f.d+state.time*0.02)*0.6; if(f.y>H){ f.y=-6; f.x=Math.random()*W; } }
  }
}
function spawnPickupParticles(x,y){
  for(let i=0;i<26;i++){
    const a=Math.random()*Math.PI*2, sp=1+Math.random()*3.5;
    state.particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,life:1,heart:Math.random()<0.4,
      col:Math.random()<0.5?'#ff8fb1':'#ffd27a'});
  }
}
function updateParticles(){
  for(const p of state.particles){ p.x+=p.vx; p.y+=p.vy; p.vy+=0.06; p.life-=0.02; }
  state.particles=state.particles.filter(p=>p.life>0);
}
function drawParticles(){
  for(const p of state.particles){
    ctx.save(); ctx.globalAlpha=Math.max(0,p.life); ctx.fillStyle=p.col; ctx.translate(p.x,p.y);
    if(p.heart){ heartPath(0,0,6); ctx.fill(); }
    else { ctx.beginPath(); ctx.arc(0,0,3,0,7); ctx.fill(); }
    ctx.restore();
  }
}
let heartTimer=0;
function ambientHearts(gy){
  if(!state.wifeActive) return;
  heartTimer++;
  if(heartTimer>90){ heartTimer=0;
    const hx=(state.hero.x-24)-state.camX;
    state.particles.push({x:hx,y:gy-90,vx:(Math.random()-0.5)*0.6,vy:-1.1,life:1,heart:true,col:'#ff8fb1'});
  }
}

/* ==== engine.js ==== */
function update(){
  if(!state.running) return;
  state.time++;
  let moving=false;
  if(keys.right){ state.hero.x+=WALK_SPEED; state.hero.facing=1; moving=true; }
  if(keys.left){ state.hero.x-=WALK_SPEED; state.hero.facing=-1; moving=true; }
  state.hero.x=Math.max(120, Math.min(WORLD_W-120, state.hero.x));
  state.moving=moving;
  if(moving) state.hero.phase += 0.28;
  const targetCam = state.hero.x - W*0.32;
  state.camX = Math.max(0, Math.min(WORLD_W-W, lerp(state.camX, targetCam, 0.12)));
  if(WORLD_W < W) state.camX = 0;
  const seg = segmentAt(state.hero.x);
  if(seg !== state.currentEvent){ state.currentEvent = seg; updateHUD(); }
  const ev = gameTimeline[seg];
  if(ev.partyMembers.includes('wife')) state.wifeActive=true;
  if(ev.partyMembers.includes('creamy_dog')) state.creamyActive=true;
  WardrobeManager.syncToEvent(seg);
  if(state.wardrobePop){
    for(const who in state.wardrobePop){
      state.wardrobePop[who] = Math.max(0, state.wardrobePop[who] - 0.06);
    }
  }
  if(currentMood!==ev.weather){ currentMood=ev.weather; }
  const segFloat = state.hero.x / SEGMENT_W;
  const iA = Math.floor(segFloat), iB = Math.min(gameTimeline.length-1, iA+1);
  const tt = segFloat - iA;
  const pa = PALETTES[gameTimeline[Math.min(iA,gameTimeline.length-1)].weather];
  const pb = PALETTES[gameTimeline[iB].weather];
  state.paletteCur = lerpPalette(pa, pb, Math.min(1,Math.max(0,tt)));
  for(const c of state.collectibles){
    if(c.taken) continue;
    if(Math.abs(state.hero.x - c.worldX) < 55){
      c.taken=true;
      state.collected.add(c.segIndex);
      showToast(c.data);
      spawnPickupParticles(c.worldX-state.camX, groundY()-70);
      chime();
      refreshNodes();
      updateHUD();
    }
  }
  updateParticles();
  if(state.hero.x >= WORLD_W-140 && !state.finished){
    state.finished=true;
    setTimeout(endGame, 700);
  }
}
function render(){
  const bg = gameTimeline[state.currentEvent];
  const pal = state.paletteCur;
  ctx.clearRect(0,0,W,H);
  drawSky(pal);
  drawSun(pal, bg);
  drawClouds(pal);
  const segF = state.hero.x / SEGMENT_W;
  const iA = Math.max(0, Math.min(gameTimeline.length-1, Math.floor(segF)));
  const iB = Math.min(gameTimeline.length-1, iA+1);
  const frac = segF - Math.floor(segF);
  const FADE = 0.15;                                  // last 15% of a segment cross-fades
  drawSegmentScenery(gameTimeline[iA], pal, 1);       // current segment, full
  if(iB!==iA && frac > 1-FADE){                       // approaching next: fade it in
    const a=(frac-(1-FADE))/FADE;
    drawSegmentScenery(gameTimeline[iB], pal, a);
  }
  drawGround(pal, bg);
  drawSpecialObjects();
  drawCollectibles();
  const gy=groundY();
  ambientHearts(gy);
  const heroScreenX = state.hero.x - state.camX;
  const walk = state.hero.phase;
  const moving = state.moving;
  const face = state.hero.facing;
  if(state.creamyActive){
    drawCreamy(heroScreenX - 118, gy, walk*1.1, face, moving);
  }
  if(state.wifeActive){
    drawHuman(heroScreenX - 62, gy, {who:'wife', skin:'#f6c9a8', shirt:'#ff8fb1', hair:'#3a2a22',
      dress:'#ff9ec2', longHair:true, walkPhase:walk+0.6, facing:face, moving});
  }
  drawHuman(heroScreenX, gy, {who:'husband', skin:'#f2c39a', shirt:'#4a7fc0', pants:'#2f3a5c', hair:'#241a14',
    walkPhase:walk, facing:face, moving});
  drawParticles();
  drawWeather(bg);
}
function loop(){
  update();
  render();
  requestAnimationFrame(loop);
}
function startGame(){
  buildCollectibles();
  buildClouds();
  buildProgressNodes();
  state.running=true;
  state.hero.x=200; state.camX=0; state.currentEvent=0;
  state.collected=new Set(); state.particles=[]; state.finished=false;
  state.wifeActive=false; state.creamyActive=false;
  state.wardrobePop={};
  WardrobeManager.reset();
  document.getElementById('startOverlay').classList.add('hidden');
  document.getElementById('endOverlay').classList.add('hidden');
  updateHUD();
  ensureAudio();
}
function endGame(){
  state.running=false;
  const total=gameTimeline.length;
  const got=state.collected.size;
  document.getElementById('endMsg').textContent =
    got===total ? "Every memory gathered — every year, every place, with you. 💗"
                : `You gathered ${got} of ${total} memories. Walk it again to find them all.`;
  const list = gameTimeline.map(ev=>{
    const has=[...state.collected].some(i=>gameTimeline[i].id===ev.id);
    return `${has?'💗':'🤍'} ${ev.date} — ${ev.title}`;
  }).join('<br>');
  document.getElementById('endStats').innerHTML=list;
  document.getElementById('endOverlay').classList.remove('hidden');
}
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('replayBtn').addEventListener('click', startGame);
let isMuted = false;
function applyMute(){
  if(bgMusic) bgMusic.muted = isMuted;
  if(musicGain) musicGain.gain.value = isMuted ? 0 : 0.018;
  const btn=document.getElementById('muteBtn');
  btn.textContent = isMuted ? '🔇' : '🔊';
  btn.classList.toggle('muted', isMuted);
  btn.title = isMuted ? 'Unmute music' : 'Mute music';
}
document.getElementById('muteBtn').addEventListener('click', (e)=>{
  e.stopPropagation();
  ensureAudio();            // in case audio hasn't started yet, start it (then toggle)
  isMuted = !isMuted;
  applyMute();
});
async function loadTimeline(){
  try{
    const res = await fetch('timeline.json?v=' + GAME_VERSION, { cache: 'no-cache' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    gameTimeline = await res.json();
  }catch(e){
    console.error('Failed to load timeline.json:', e);
    gameTimeline = [];   // guard; boot() will show a message
  }
  WORLD_W = SEGMENT_W * gameTimeline.length;
}
async function boot(){
  await loadTimeline();
  if(!gameTimeline.length){
    const b=document.getElementById('versionBadge');
    if(b) b.textContent = 'v'+GAME_VERSION+' — failed to load timeline.json';
    return;
  }
  loadSprites();
  WardrobeManager.load();
  const b=document.getElementById('versionBadge'); if(b) b.textContent='v'+GAME_VERSION;
  updateHUD();
  document.getElementById('hTotal').textContent = gameTimeline.length;  // in case markup default differs
  loop();
}
boot();
