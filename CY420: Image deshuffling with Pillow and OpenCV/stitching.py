#  FOR SOME REASON, PROGRAM DOESN'T WORK WITH UBUNTU DEFAULT IMAGE VIEWER
#  INSTALL IMAGEMAGICK (sudo apt install imagemagick), AND PROGRAM WILL DISPLAY THE FULL IMAGE
#  Austin Bannister, Blake Stroh, Chris Prosser, Justin Strauss
#
#
#



import numpy as np
from numpy import random
import PIL
from PIL import Image
import matplotlib.pyplot as plt
import cv2

# How many equal-size pieces
nRow = 4
nColumn = 8
# Calculate the difference between the two sizes of each cut line
def recoveryScore(wPic):
    score = 0
    lines = []
    for i in xrange(1, nColumn):
        line1 = wPic[:,i*w/nColumn-1,:]
        line2 = wPic[:,i*w/nColumn,:]
        delta = line2-line1
        if (np.size(delta) / np.size(delta[delta<26])) < 3:
          lines.append(i)
          score = score + 1
    for i in xrange(1, nRow):
        line1 = wPic[i*h/nRow-1,:,:]
        line2 = wPic[i*h/nRow,:,:]
        delta = line2-line1
    if (np.size(delta) / np.size(delta[delta<26])) < 3:
      lines.append(i+nColumn-1)
      score = score + 1
    return score, lines

# Compose a pic from the pieces
def picFromPieces(aPiece, indexList, transList):
    bPiece = []
    # Update these arrays manually
    #FLIP 0 and 3, FLIP 1 and 2
    idx = list(indexList[:])
    oper = list(transList[:])
    for i in xrange(0, np.size(idx)):
        pieceIdx = idx[i]

        # transform the pieces: no change, rotate 180 degree, or turn it over
        transOper = oper[i]

        if transOper == 0:
          bPiece.append(aPiece[pieceIdx])
        if transOper == 1:
          bPiece.append(np.rot90(aPiece[pieceIdx], 2))
        if transOper == 2:
          bPiece.append(np.flipud(aPiece[pieceIdx]))
        if transOper == 3:
          bPiece.append(np.fliplr(aPiece[pieceIdx]))

    nBlk, blkH, blkW, blkL = np.shape(bPiece)

    # Compose the whole picture
    wholePic = np.zeros((2*blkH, 2*blkW, blkL), dtype=np.uint8)
    print np.shape(wholePic)

    for i in xrange(0, 2):
        for j in xrange(0, 2):
            wholePic[i*blkH:(i+1)*blkH,j*blkW:(j+1)*blkW,:] = bPiece[i*2+j]
    return wholePic

def get_concat_h(im1, im2, im3, im4):
    dst = Image.new('RGB', (im1.width + im2.width + im3.width + im4.width, im1.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (im1.width, 0))
    dst.paste(im3, (im1.width+im2.width, 0))
    dst.paste(im4, (im1.width+im2.width+im3.width, 0))
    return dst

def get_concat_v(im1, im2):
    dst = Image.new('RGB', (im1.width, im1.height + im2.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (0, im1.height))
    return dst

def main():
    #picList = []
# Eight lists of indices, 1 = left of image, 4 = right of image.
    Top1 = [16, 10, 11, 18]
    Top2 = [3, 1, 6, 2]
    Top3 = [23, 24, 12, 13]
    Top4 = [27, 28, 29, 15]
    Btm1 = [22, 4, 26, 19]
    Btm2 = [14, 8, 20, 0]
    Btm3 = [5, 25, 17, 31]
    Btm4 = [30, 7, 21, 9]
    # Eight lists of operators (1 = flipped, 0 = normal)
    # 1 = left of image, 4 = right.
    opTop1 = [0,1,1,1]
    opTop2 = [1,0,1,0]
    opTop3 = [1,1,1,0]
    opTop4 = [1,0,1,1]
    opBtm1 = [1,0,1,0]
    opBtm2 = [1,1,1,0]
    opBtm3 = [0,1,0,1]
    opBtm4 = [0,1,1,0]
    # read image array from a file
    readImg = plt.imread("Messed32.jpg")
    #readImg = np.load("Messed32.npy")
    h,w,l = np.shape(readImg)

    # round the image
    h = h/nRow*nRow
    w = w/nColumn * nColumn
    roundImg = readImg[0:h,0:w,:]
    #print roundImg.dtype

    #piece array
    aPiece = []

    for row in xrange(0,nRow):
        for column in xrange(0,nColumn):
            iPiece = roundImg[row*h/nRow:(row+1)*h/nRow,column*w/nColumn:(column+1)*w/nColumn,:]
            aPiece.append(iPiece)

    # randomly shuffle the pieces of the messed figure to find a one matching the original figure
    pieceA = picFromPieces(aPiece, Top1, opTop1)
    pieceA = Image.fromarray(pieceA)

    pieceB = picFromPieces(aPiece, Top2, opTop2)
    pieceB = Image.fromarray(pieceB)

    pieceC = picFromPieces(aPiece, Top3, opTop3)
    pieceC = Image.fromarray(pieceC)

    pieceD = picFromPieces(aPiece, Top4, opTop4)
    pieceD = Image.fromarray(pieceD)

    pieceE = picFromPieces(aPiece, Btm1, opBtm1)
    pieceE = Image.fromarray(pieceE)

    pieceF = picFromPieces(aPiece, Btm2, opBtm2)
    pieceF = Image.fromarray(pieceF)

    pieceG = picFromPieces(aPiece, Btm3, opBtm3)
    pieceG = Image.fromarray(pieceG)

    pieceH = picFromPieces(aPiece, Btm4, opBtm4)
    pieceH = Image.fromarray(pieceH)

    top_half = get_concat_h(pieceA, pieceB, pieceC, pieceD)
    bottom_half = get_concat_h(pieceE, pieceF, pieceG, pieceH)

    stitched_image = get_concat_v(top_half, bottom_half)
    stitched_image.show()


main()
