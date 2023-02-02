

gs -dSAFER -dBATCH -dQUIET -dNOPAUSE -dEPSCrop -r600 -sDEVICE=png256 -sOutputFile=$2 $1
if [ $? -ne 0 ]; then
  echo "Run error."
  exit
fi
#
echo "Converted $1 to $2."
